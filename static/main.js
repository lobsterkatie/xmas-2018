$("#pictures").nanogallery2({
  galleryTheme: { thumbnail: { background: "#000" } },
  thumbnailHeight: 150,
  thumbnailWidth: 150,
  itemsBaseURL: "/static/img/",
  thumbnailDisplayOutsideScreen: true,
  thumbnailGutterWidth: 2,
  thumbnailGutterHeight: 2,
  thumbnailBorderHorizontal: 0,
  thumbnailBorderVertical: 0,
  thumbnailDisplayTransition: "slideLeft",
  thumbnailDisplayTransitionDuration: 1000,
  thumbnailHoverEffect2: "image_scale_1.00_.95",

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

setTimeout(function() {
  $("svg").each(function() {
    var svg = $(this);
    var text = svg.find("text");
    var bbox = text.get(0).getBBox();

    svg
      .get(0)
      .setAttribute(
        "viewBox",
        [bbox.x, bbox.y, bbox.width, bbox.height].join(" ")
      );
  });
}, 100);
