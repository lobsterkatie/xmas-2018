/****************** USEFUL GLOBALS ******************/

let windowHeight = $(window).height();

// in order to enforce a minimum aspect ratio
let contentHeight = calcContentHeight(windowHeight);

let sectionIndex = 0;

/****************** HELPER FUNCTIONS FOR GALLERY ******************/

// hack to make flexbox work, so the gallery can be centered vertically:
// wait to put flex class on until the gallery is fully made
// in the meantime, hide it so we don't see it move when the class is added
async function makeGallery(contentHeight) {
  $("#gallery").css("visibility", "hidden");

  // wait for the gallery to finish constructing itself
  await _makeGallery(contentHeight);

  // psych! it's not done.
  // wait an extra second until the gallery is *actually* done, then make it
  // flex-y and show it
  setTimeout(() => {
    // further hack to make vertical centering work - make the wrapper div
    // have a height equal to its contents
    $(".nGY2Gallery").height($(".nGY2GallerySub").height());

    $("#pictures").addClass("flex");
    $("#pictures-wrapper").addClass("flex");
    $("#gallery").css("visibility", "visible");
  }, 1000);
}

// wrap the gallery construction in an async function to make it promise-y and
// awaitable
async function _makeGallery(contentHeight) {
  // we want the whole gallery to be 80% of the viewport height, and there
  // 4 rows, so each row's height should be 20% of the viewport height
  let thumbnailDimension = contentHeight / 5;

  $("#gallery").nanogallery2({
    galleryTheme: { thumbnail: { background: "#0c0c1c" } },
    thumbnailHeight: thumbnailDimension,
    thumbnailWidth: thumbnailDimension,
    itemsBaseURL: "/static/img/",
    thumbnailDisplayOutsideScreen: true,
    thumbnailGutterWidth: 2,
    thumbnailGutterHeight: 2,
    thumbnailBorderHorizontal: 0,
    thumbnailBorderVertical: 0,
    thumbnailHoverEffect2: "image_scale_1.00_.95",
    viewerToolbar: { display: false },
    viewerTools: { topLeft: "", topRight: "closeButton" },

    galleryMosaic: [
      { r: 1, c: 1, w: 2, h: 2 },
      { r: 1, c: 3, w: 1, h: 1 },
      { r: 1, c: 4, w: 1, h: 2 },
      { r: 1, c: 5, w: 2, h: 1 },
      { r: 2, c: 3, w: 1, h: 1 },
      { r: 2, c: 5, w: 2, h: 2 },
      { r: 3, c: 1, w: 1, h: 2 },
      { r: 3, c: 2, w: 2, h: 1 },
      { r: 3, c: 4, w: 1, h: 1 },
      { r: 4, c: 2, w: 1, h: 1 },
      { r: 4, c: 3, w: 2, h: 1 },
      { r: 4, c: 5, w: 1, h: 1 },
      { r: 4, c: 6, w: 1, h: 1 }
    ],

    items: [
      { src: "a.jpg", srct: "thumbnails/a_thumb.jpg" },
      { src: "b.jpg", srct: "thumbnails/b_thumb.jpg" },
      { src: "c.jpg", srct: "thumbnails/c_thumb.jpg" },
      { src: "d.jpg", srct: "thumbnails/d_thumb.jpg" },
      { src: "e.jpg", srct: "thumbnails/e_thumb.jpg" },
      { src: "f.jpg", srct: "thumbnails/f_thumb.jpg" },
      { src: "g.jpg", srct: "thumbnails/g_thumb.jpg" },
      { src: "h.jpg", srct: "thumbnails/h_thumb.jpg" },
      { src: "i.jpg", srct: "thumbnails/i_thumb.jpg" },
      { src: "k.jpg", srct: "thumbnails/k_thumb.jpg" },
      { src: "l.jpg", srct: "thumbnails/l_thumb.jpg" },
      { src: "m.jpg", srct: "thumbnails/m_thumb.jpg" },
      { src: "n.jpg", srct: "thumbnails/n_thumb.jpg" }
    ]
  });
}

/****************** HELPER FUNCTIONS FOR SCROLLING ******************/

// an awaitable timer to pause script execution for the given number of
// milliseconds
function timer(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// like Python's enumerate, but for a Jquery selector set
function enumerateJQuery(jqueryObj) {
  let array = $.makeArray(jqueryObj);
  return array.entries();
}

// make the text in the second section appear one line at a time
async function showText() {
  const delays = [2200, 2400, 2600, 2800, 1400, 2000, 600];

  // wait a second after scrolling to start
  await timer(1000);

  //show each line and then pause before showing the next one
  for (let [i, line] of enumerateJQuery($(".appearing-block"))) {
    $(line).animate({ opacity: 1 }, 1000);
    await timer(delays[i]);
  }
}

// scroll when the scroll button is clicked
async function scroll(windowHeight) {
  $("#scroll-button").hide();

  window.scrollBy({
    top: windowHeight,
    behavior: "smooth"
  });
  sectionIndex = sectionIndex + 1;

  // make the text in the second section appear one line at a time
  if (sectionIndex === 1) {
    await showText();
  }

  //for every section except the last, wait, then show the scroll button
  if (sectionIndex !== 4) {
    await timer(2000);
    $("#scroll-button").fadeIn(1000);
  }
}

async function initScrollButton(windowHeight) {
  $("#scroll-button").click(() => scroll(windowHeight));
  await timer(1600);
  $("#scroll-button").fadeIn(2000);
}

/****************** HELPER FUNCTIONS FOR RESIZING ******************/

//enforce aspect ratio by capping height in comparison to width
function calcContentHeight(windowHeight) {
  let windowWidth = $(window).width();
  return Math.min(windowHeight, windowWidth / 1.8);
}

function setContentScale(contentHeight) {
  let root = document.documentElement;
  root.style.setProperty("--scaled-vh", contentHeight / 100 + "px");
}

// set the `scaled-vh` CSS variable on page-load and reset it on page
// resize
function enableScaling(contentHeight) {
  setContentScale(contentHeight);

  // resizing not currentyly working for gallery
  $(window).resize(() => {
    let newWindowHeight = $(window).height();
    let newContentHeight = calcContentHeight(newWindowHeight);

    // reset the scrolling behavior for the new window size
    $("#scroll-button").off();
    $("#scroll-button").click(() => scroll(newWindowHeight));

    setContentScale(newContentHeight);
    // makeGallery(newContentHeight); //not working!
  });
}
/****************** STUFF THAT ACTUALL HAPPENS ******************/

enableScaling(contentHeight);
initScrollButton(windowHeight);
makeGallery(contentHeight);
