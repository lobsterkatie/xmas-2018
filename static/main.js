$("#pictures").nanogallery2({
  thumbnailHeight: 150,
  thumbnailWidth: 150,
  itemsBaseURL: "/static/img/",

  items: [
    { src: "img1.jpg", srct: "img1.jpg", title: "Test 1" },
    { src: "img2.jpg", srct: "img2.jpg", title: "Test 2" },
    { src: "img3.jpg", srct: "img3.jpg", title: "Test 3" }
  ]
});
