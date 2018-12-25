/****************** USEFUL GLOBALS ******************/

let windowHeight = $(window).height();
let sectionIndex = 0;

/****************** HELPER FUNCTIONS FOR GALLERY ******************/

// hack to make flexbox work, so the gallery can be centered vertically:
// wait to put flex class on until the gallery is fully made
// in the meantime, hide it so we don't see it move when the class is added
async function makeGallery(windowHeight) {
  $("#gallery").css("visibility", "hidden");

  // wait for the gallery to finish constructing itself
  await _makeGallery(windowHeight);

  // psych! it's not done.
  // wait an extra second until the gallery is *actually* done, then make it
  // flex-y and show it
  setTimeout(() => {
    // further hack to make vertical centering work
    $(".nGY2Gallery").height($(".nGY2GallerySub").height());

    $("#pictures").addClass("flex");
    $("#gallery").css("visibility", "visible");
  }, 1000);
}

// wrap the gallery construction in an async function to make it promise-y and
// awaitable
async function _makeGallery(windowHeight) {
  // we want the whole gallery to be 80% of the viewport height, and there
  // 4 rows, so each row's height should be 20% of the viewport height
  let thumbnailDimension = windowHeight / 5;

  $("#gallery").nanogallery2({
    galleryTheme: { thumbnail: { background: "#000" } },
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

function timer(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function enumerateJQuery(jqueryObj) {
  let array = $.makeArray(jqueryObj);
  return array.entries();
}

async function scroll(windowHeight) {
  $("#new-scroll-button").hide();

  window.scrollBy({
    top: windowHeight,
    behavior: "smooth"
  });
  sectionIndex = sectionIndex + 1;

  // make the text in the second section appear one line at a time
  if (sectionIndex === 1) {
    const delays = [2200, 2400, 2600, 2800, 1400, 2000, 2600];

    await timer(1000);
    for (let [i, line] of enumerateJQuery($(".appearing-block"))) {
      $(line).animate({ opacity: 1 }, 1000);
      await timer(delays[i]);
    }
  }

  //for other sections (except the last), wait, then  show the scroll button
  if (sectionIndex !== 1) {
    await timer(2000);
  }
  if (sectionIndex !== 4) {
    $("#new-scroll-button").fadeIn(1000);
  }
}

async function initScrollButton(windowHeight) {
  $("#new-scroll-button").click(() => scroll(windowHeight));
  await timer(1600);
  $("#new-scroll-button").fadeIn(2000);
}

/****************** STUFF THAT ACTUALL HAPPENS ******************/

makeGallery(windowHeight);
initScrollButton(windowHeight);
