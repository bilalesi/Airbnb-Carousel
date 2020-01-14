//@flow
import React from "react";
import SwipeableViews from "react-swipeable-views";
import { virtualize } from "react-swipeable-views-utils";
import { State } from "react-powerplug";
import { css } from "react-emotion";
import LazyLoad from "react-lazyload";
import cloudinaryUrl from "./utils/cloudinaryUrl";
import ProgressiveImage from "./ProgressiveImage";
import BackgroundImage from "./BackgroundImage";
import BubbleLoader from "./BubbleLoader";
import Flex from "./LayoutFlex";
import Box from "./LayoutBox";

import Pagination from "./Pagination";
import ArrowNavigation from "./ArrowNavigation";

const VirtualizeSwipeableViews = virtualize(SwipeableViews);
const MAX_POSSIBLE_MOBILE_SCREEN_HEIGHT = 960;

const Carousel = ({ imageUrls, initialIndex, width, loadSSRFullImage }) => {
  const slideCount = imageUrls.length || 0;

  // placeholder image for SSR
  const placeholder = (
    <BackgroundImage
      key="0"
      bg="lightgrey"
      className={
        imageUrls[0]
          ? css`
              background-image: ${
                loadSSRFullImage
                  ? `url(${cloudinaryUrl(
                      { w: width, q: "auto" },
                      imageUrls[0]
                    )}),`
                  : ""
              }
                url(${cloudinaryUrl(
                  { w: 20, e: "blur:200", q: "auto" },
                  imageUrls[0]
                )});
            `
          : ""
      }
    />
  );
  return (
    <LazyLoad
      once
      placeholder={placeholder}
      offset={MAX_POSSIBLE_MOBILE_SCREEN_HEIGHT}
    >
      <State
        initial={{ index: initialIndex, loadedIndexes: [0], hover: false }}
      >
        {({ state, setState }) => (
          <div
            className={css`
              position: relative;
              * {
                box-sizing: border-box;
              }
            `}
          >
            <VirtualizeSwipeableViews
              index={state.index}
              // load 6 tiny image to never have blank loading image
              overscanSlideAfter={6}
              overscanSlideBefore={2}
              onChangeIndex={value =>
                setState({
                  index: value,
                  loadedIndexes: [value, ...state.loadedIndexes]
                })
              }
              onMouseEnter={() => setState({ hover: true })}
              onMouseLeave={() => setState({ hover: false })}
              onTouchStart={() =>
                state.hover ? setState({ hover: false }) : undefined
              }
              onTouchEnd={() =>
                state.hover ? setState({ hover: false }) : undefined
              }
              slideCount={slideCount}
              slideRenderer={({ index, key }) => {
                const url = imageUrls[index];

                // Only start loading full image when required
                const image = state.loadedIndexes.includes(index)
                  ? cloudinaryUrl({ w: width, q: "auto" }, url)
                  : cloudinaryUrl({ w: 20, e: "blur:200", q: "auto" }, url);

                // No need of a progressive image for index 0 as it is served by ssr
                // this prevents blink
                return index === 0 && loadSSRFullImage ? (
                  placeholder
                ) : (
                  <ProgressiveImage
                    key={key}
                    src={image}
                    placeholder={cloudinaryUrl(
                      { w: 20, e: "blur:200", q: "auto" },
                      url
                    )}
                  >
                    {(src, loading) => (
                      <Flex alignItems="center" justifyContent="center">
                        {loading &&
                          src && (
                            <Box position="absolute" zIndex={1}>
                              <BubbleLoader loading={loading} color="white" />
                            </Box>
                          )}
                        <BackgroundImage
                          bg="lightgray"
                          className={
                            loading && src
                              ? css`
                                  filter: blur(8px);
                                `
                              : css`
                                  filter: blur(0px);
                                  transition: 300ms filter ease;
                                `
                          }
                          key={key}
                          src={src}
                        />
                      </Flex>
                    )}
                  </ProgressiveImage>
                );
              }}
            />

            {imageUrls.length > 1 &&
              state.hover && (
                <ArrowNavigation
                  slideCount={slideCount}
                  index={state.index || 0}
                  onMouseEnter={() => setState({ hover: true })}
                  onMouseLeave={() => setState({ hover: false })}
                  onTouchStart={() =>
                    state.hover ? setState({ hover: false }) : undefined
                  }
                  onTouchEnd={() =>
                    state.hover ? setState({ hover: false }) : undefined
                  }
                  onChangeIndex={value => {
                    setState({
                      index: value,
                      loadedIndexes: [value, ...state.loadedIndexes]
                    });
                  }}
                />
              )}
            {imageUrls.length > 1 && (
              <Pagination
                slideCount={slideCount}
                index={state.index || 0}
                onChangeIndex={value =>
                  setState({
                    index: value,
                    loadedIndexes: [value, ...state.loadedIndexes]
                  })
                }
              />
            )}
          </div>
        )}
      </State>
    </LazyLoad>
  );
};

Carousel.defaultProps = {
  initialIndex: 0,
  width: 800,
  loadSSRFullImage: false
};

export default Carousel;
