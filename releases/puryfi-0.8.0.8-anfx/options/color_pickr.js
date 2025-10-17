// TODO: create a single picker for input and one for caption tags and just attach them where needed

const picker_swatches = [
   "rgba(244, 67, 54, 1)",
   "rgba(233, 30, 99, 1)",
   "rgba(156, 39, 176, 1)",
   "rgba(103, 58, 183, 1)",
   "rgba(63, 81, 181, 1)",
   "rgba(33, 150, 243, 1)",
   "rgba(3, 169, 244, 1)",
   "rgba(0, 188, 212, 1)",
   "rgba(0, 150, 136, 1)",
   "rgba(76, 175, 80, 1)",
   "rgba(139, 195, 74, 1)",
   "rgba(205, 220, 57, 1)",
   "rgba(255, 235, 59, 1)",
   "rgba(255, 193, 7, 1)",
];

let color_elems = $('input[data-input-type="color"]').toArray();

let picker_elems = color_elems.map((color_elem) =>
   Pickr.create({
      el: color_elem,
      appClass: "input__color-picker",
      theme: "nano",
      useAsButton: true,
      swatches: picker_swatches,
      padding: 6,
      components: {
         opacity: true,
         hue: true,
      },
   })
);

for (let i = 0; i < color_elems.length; i++) {
   let color_elem = color_elems[i],
      picker_elem = picker_elems[i];
   const setColor = (color) => {
      let hex = color.toHEXA().toString();
      $(color_elem).val(hex);
      $(color_elem).css("background-color", hex);
   };
   picker_elem
      .on("change", (color, e, instance) => {
         setColor(color);
      })
      .on("changestop", (e, instance) => {
         setColor(instance.getColor());
         $(color_elem).trigger("change");
      })
      .on("swatchselect", (color, instance) => {
         setColor(color);
         $(color_elem).trigger("change");
      })
      .on("show", (color, instance) => {
         picker_elem.setColor($(color_elem).val(), true);
      });
}

// pickr.js is bugged, setting closeOnScroll to true will also cause the picker to close when the input is scrolled quickly enough, no idea why
document.addEventListener("scroll", (event) => {
   for (let picker of picker_elems) picker.hide();
});
