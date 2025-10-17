const updateCensorTypePresetConfig = {
   0: null,
   1: (preset, do_highlight = false) => {
      updateInputField($("#pixel_shape"), preset.config.shape, do_highlight);
      updateOnCensorShapeChange($("#pixel_shape"));
      updateInputField(
         $("#pixel_rounding"),
         preset.config.rounding,
         do_highlight
      );
      updateInputField(
         $("#pixel_scale"),
         preset.config.scale * 100,
         do_highlight
      );
      updateInputField(
         $("#pixel_feathering"),
         preset.config.feathering,
         do_highlight
      );
      updateInputField(
         $("#pixel_border_width"),
         preset.config.border_width,
         do_highlight
      );
      updateInputField(
         $("#pixel_border_color"),
         preset.config.border_color,
         do_highlight
      );
      $("#pixel_border_color").css(
         "background-color",
         preset.config.border_color
      );
      updateInputField($("#pixel_type"), preset.config.ty, do_highlight);
      updateInputField(
         $("#pixel_strength"),
         preset.config.strength,
         do_highlight
      );
      updateInputField(
         $("#pixel_grid_width"),
         preset.config.grid_width,
         do_highlight
      );
      updateInputField(
         $("#pixel_grid_color"),
         preset.config.grid_color,
         do_highlight
      );
      $("#pixel_grid_color").css("background-color", preset.config.grid_color);
      updateInputField(
         $("#pixel_density"),
         preset.config.density * 100,
         do_highlight
      );
      updateInputField($("#pixel_color"), preset.config.color, do_highlight);
      $("#pixel_color").css("background-color", preset.config.color);
      updateInputField(
         $("#pixel_bg_color"),
         preset.config.bg_color,
         do_highlight
      );
      $("#pixel_bg_color").css("background-color", preset.config.bg_color);
      updateInputField(
         $("#pixel_channel_colors"),
         preset.config.channel_colors,
         do_highlight
      );
      updateInputCheckbox(
         $("#pixel_grayscale"),
         preset.config.grayscale,
         do_highlight
      );
      updateInputCheckbox(
         $("#pixel_scale_with_detection"),
         preset.config.scale_with_detection,
         do_highlight
      );
      updateInputCheckbox(
         $("#pixel_accurate_sampling"),
         preset.config.accurate_sampling,
         do_highlight
      );
      updateInputField(
         $("#pixel_color_mode"),
         preset.config.color_mode,
         do_highlight
      );
      updateInputCheckbox(
         $("#pixel_cluster"),
         preset.config.cluster,
         do_highlight
      );
      updateInputSelect(
         $("#pixel_cluster_preset_index"),
         preset.config.cluster_preset_index,
         do_highlight
      );
      updateInputCheckbox(
         $("#pixel_caption"),
         preset.config.caption,
         do_highlight
      );
      updateInputSelect(
         $("#pixel_caption_preset_index"),
         preset.config.caption_preset_index,
         do_highlight
      );
      updateInputCheckbox(
         $("#pixel_word_wall"),
         preset.config.word_wall,
         do_highlight
      );
      updateInputSelect(
         $("#pixel_word_wall_preset_index"),
         preset.config.word_wall_preset_index,
         do_highlight
      );

      updateOnPixelTypeChange();
   },
   2: (preset, do_highlight = false) => {
      updateInputField($("#blur_shape"), preset.config.shape, do_highlight);
      updateOnCensorShapeChange($("#blur_shape"));
      updateInputField(
         $("#blur_rounding"),
         preset.config.rounding,
         do_highlight
      );
      updateInputField(
         $("#blur_scale"),
         preset.config.scale * 100,
         do_highlight
      );
      updateInputField(
         $("#blur_feathering"),
         preset.config.feathering,
         do_highlight
      );
      updateInputField(
         $("#blur_border_width"),
         preset.config.border_width,
         do_highlight
      );
      updateInputField(
         $("#blur_border_color"),
         preset.config.border_color,
         do_highlight
      );
      $("#blur_border_color").css(
         "background-color",
         preset.config.border_color
      );
      updateInputField($("#blur_type"), preset.config.ty, do_highlight);
      updateInputField(
         $("#blur_strength"),
         preset.config.strength,
         do_highlight
      );
      updateInputCheckbox(
         $("#blur_grayscale"),
         preset.config.grayscale,
         do_highlight
      );
      updateInputCheckbox(
         $("#blur_cluster"),
         preset.config.cluster,
         do_highlight
      );
      updateInputSelect(
         $("#blur_cluster_preset_index"),
         preset.config.cluster_preset_index,
         do_highlight
      );
      updateInputCheckbox(
         $("#blur_caption"),
         preset.config.caption,
         do_highlight
      );
      updateInputSelect(
         $("#blur_caption_preset_index"),
         preset.config.caption_preset_index,
         do_highlight
      );
      updateInputCheckbox(
         $("#blur_word_wall"),
         preset.config.word_wall,
         do_highlight
      );
      updateInputSelect(
         $("#blur_word_wall_preset_index"),
         preset.config.word_wall_preset_index,
         do_highlight
      );
   },
   3: (preset, do_highlight = false) => {
      updateInputField($("#bar_shape"), preset.config.shape, do_highlight);
      updateOnCensorShapeChange($("#bar_shape"));
      updateInputField(
         $("#bar_rounding"),
         preset.config.rounding,
         do_highlight
      );
      updateInputField(
         $("#bar_scale"),
         preset.config.scale * 100,
         do_highlight
      );
      updateInputField(
         $("#bar_feathering"),
         preset.config.feathering,
         do_highlight
      );
      updateInputField(
         $("#bar_border_width"),
         preset.config.border_width,
         do_highlight
      );
      updateInputField(
         $("#bar_border_color"),
         preset.config.border_color,
         do_highlight
      );
      $("#bar_border_color").css(
         "background-color",
         preset.config.border_color
      );
      updateInputField($("#bar_type"), preset.config.ty, do_highlight);
      updateOnBarTypeChange();
      updateInputField($("#bar_color"), preset.config.color, do_highlight);
      $("#bar_color").css("background-color", preset.config.color);
      updateInputField(
         $("#bar_opacity"),
         preset.config.opacity * 100,
         do_highlight
      );
      updateInputCheckbox(
         $("#bar_cluster"),
         preset.config.cluster,
         do_highlight
      );
      updateInputSelect(
         $("#bar_cluster_preset_index"),
         preset.config.cluster_preset_index,
         do_highlight
      );
      updateInputCheckbox(
         $("#bar_caption"),
         preset.config.caption,
         do_highlight
      );
      updateInputSelect(
         $("#bar_caption_preset_index"),
         preset.config.caption_preset_index,
         do_highlight
      );
      updateInputCheckbox(
         $("#bar_word_wall"),
         preset.config.word_wall,
         do_highlight
      );
      updateInputSelect(
         $("#bar_word_wall_preset_index"),
         preset.config.word_wall_preset_index,
         do_highlight
      );
   },
   4: (preset, do_highlight = false) => {
      updateInputField($("#triangle_shape"), preset.config.shape, do_highlight);
      updateOnCensorShapeChange($("#triangle_shape"));
      updateInputField(
         $("#triangle_rounding"),
         preset.config.rounding,
         do_highlight
      );
      updateInputField(
         $("#triangle_scale"),
         preset.config.scale * 100,
         do_highlight
      );
      updateInputField(
         $("#triangle_feathering"),
         preset.config.feathering,
         do_highlight
      );
      updateInputField(
         $("#triangle_border_width"),
         preset.config.border_width,
         do_highlight
      );
      updateInputField(
         $("#triangle_border_color"),
         preset.config.border_color,
         do_highlight
      );
      $("#triangle_border_color").css(
         "background-color",
         preset.config.border_color
      );
      updateInputField(
         $("#triangle_vertex_count"),
         preset.config.vertex_count,
         do_highlight
      );
      updateInputField(
         $("#triangle_threshold"),
         preset.config.threshold,
         do_highlight
      );
      updateInputField(
         $("#triangle_accuracy"),
         preset.config.accuracy * 100,
         do_highlight
      );
      updateInputField(
         $("#triangle_blurring"),
         preset.config.blurring,
         do_highlight
      );
      updateInputField(
         $("#triangle_fill_color_mode"),
         preset.config.fill_color_mode,
         do_highlight
      );
      updateInputField(
         $("#triangle_fill_color"),
         preset.config.fill_color,
         do_highlight
      );
      $("#triangle_fill_color").css(
         "background-color",
         preset.config.fill_color
      );
      updateInputField(
         $("#triangle_stroke_color_mode"),
         preset.config.stroke_color_mode,
         do_highlight
      );
      updateInputField(
         $("#triangle_stroke_color"),
         preset.config.stroke_color,
         do_highlight
      );
      $("#triangle_stroke_color").css(
         "background-color",
         preset.config.stroke_color
      );
      updateInputField(
         $("#triangle_stroke_width"),
         preset.config.stroke_width,
         do_highlight
      );
      updateInputCheckbox(
         $("#triangle_gradients"),
         preset.config.gradients,
         do_highlight
      );
      updateInputField(
         $("#triangle_gradient_stops"),
         preset.config.gradient_stops,
         do_highlight
      );
      updateInputField(
         $("#triangle_line_join"),
         preset.config.line_join,
         do_highlight
      );
      updateInputCheckbox(
         $("#triangle_transparent_color"),
         preset.config.transparent_color,
         do_highlight
      );
      updateInputCheckbox(
         $("#triangle_cluster"),
         preset.config.cluster,
         do_highlight
      );
      updateInputSelect(
         $("#triangle_cluster_preset_index"),
         preset.config.cluster_preset_index,
         do_highlight
      );
      updateInputCheckbox(
         $("#triangle_caption"),
         preset.config.caption,
         do_highlight
      );
      updateInputSelect(
         $("#triangle_caption_preset_index"),
         preset.config.caption_preset_index,
         do_highlight
      );
      updateInputCheckbox(
         $("#triangle_word_wall"),
         preset.config.word_wall,
         do_highlight
      );
      updateInputSelect(
         $("#triangle_word_wall_preset_index"),
         preset.config.word_wall_preset_index,
         do_highlight
      );

      updateOnTriangleFillColorModeChange();
      updateOnTriangleStrokeColorModeChange();
      updateOnTriangleGradientsChange();
   },
   5: (preset, do_highlight = false) => {
      updateInputField(
         $("#box_scale"),
         preset.config.scale * 100,
         do_highlight
      );
      updateInputField($("#box_display"), preset.config.display, do_highlight);
      updateInputField(
         $("#box_fill_color"),
         preset.config.fill_color,
         do_highlight
      );
      $("#box_fill_color").css("background-color", preset.config.fill_color);
      updateInputField(
         $("#box_border_color"),
         preset.config.border_color,
         do_highlight
      );
      $("#box_border_color").css(
         "background-color",
         preset.config.border_color
      );
      updateInputCheckbox(
         $("#box_cluster"),
         preset.config.cluster,
         do_highlight
      );
      updateInputSelect(
         $("#box_cluster_preset_index"),
         preset.config.cluster_preset_index,
         do_highlight
      );
      updateInputCheckbox(
         $("#box_caption"),
         preset.config.caption,
         do_highlight
      );
      updateInputSelect(
         $("#box_caption_preset_index"),
         preset.config.caption_preset_index,
         do_highlight
      );
      updateInputCheckbox(
         $("#box_word_wall"),
         preset.config.word_wall,
         do_highlight
      );
      updateInputSelect(
         $("#box_word_wall_preset_index"),
         preset.config.word_wall_preset_index,
         do_highlight
      );
   },
   6: (preset, do_highlight = false) => {
      updateInputField($("#glitch_type"), preset.config.ty, do_highlight);
      updateInputField(
         $("#glitch_scale"),
         preset.config.scale * 100,
         do_highlight
      );
      updateInputField(
         $("#glitch_chromatic_aberration_color_intensity"),
         preset.config.chromatic_aberration_color_intensity * 100,
         do_highlight
      );
      updateInputField(
         $("#glitch_chromatic_aberration_shift_intensity"),
         preset.config.chromatic_aberration_shift_intensity * 100,
         do_highlight
      );
      updateInputCheckbox(
         $("#glitch_chromatic_aberration_horizontal_shift"),
         preset.config.chromatic_aberration_horizontal_shift,
         do_highlight
      );
      updateInputCheckbox(
         $("#glitch_chromatic_aberration_vertical_shift"),
         preset.config.chromatic_aberration_vertical_shift,
         do_highlight
      );
      updateInputField(
         $("#glitch_multiple_panels_amount"),
         preset.config.multiple_panels_amount,
         do_highlight
      );
      updateInputField(
         $("#glitch_multiple_panels_min_size"),
         preset.config.multiple_panels_min_size * 100,
         do_highlight
      );
      updateInputField(
         $("#glitch_multiple_panels_max_size"),
         preset.config.multiple_panels_max_size * 100,
         do_highlight
      );
      updateInputField(
         $("#glitch_multiple_panels_scatter"),
         preset.config.multiple_panels_scatter * 100,
         do_highlight
      );
      updateInputField(
         $("#glitch_multiple_panels_split_chance"),
         preset.config.multiple_panels_split_chance * 100,
         do_highlight
      );
      updateInputCheckbox(
         $("#glitch_multiple_panels_border"),
         preset.config.multiple_panels_border,
         do_highlight
      );
      for (let i = 0; i < preset.config.multiple_panels_gradient.length; i++) {
         updateInputField(
            $(`#glitch_multiple_panels_gradient_color_${i}`),
            preset.config.multiple_panels_gradient[i].color,
            do_highlight
         );
         $(`#glitch_multiple_panels_gradient_color_${i}`).css(
            "background-color",
            preset.config.multiple_panels_gradient[i].color
         );
         updateInputField(
            $(`#glitch_multiple_panels_gradient_offset_${i}`),
            preset.config.multiple_panels_gradient[i].offset * 100,
            do_highlight
         );
      }
      updateInputCheckbox(
         $("#glitch_cluster"),
         preset.config.cluster,
         do_highlight
      );
      updateInputSelect(
         $("#glitch_cluster_preset_index"),
         preset.config.cluster_preset_index,
         do_highlight
      );
      updateInputCheckbox(
         $("#glitch_caption"),
         preset.config.caption,
         do_highlight
      );
      updateInputSelect(
         $("#glitch_caption_preset_index"),
         preset.config.caption_preset_index,
         do_highlight
      );
      updateInputCheckbox(
         $("#glitch_word_wall"),
         preset.config.word_wall,
         do_highlight
      );
      updateInputSelect(
         $("#glitch_word_wall_preset_index"),
         preset.config.word_wall_preset_index,
         do_highlight
      );

      updateOnGlitchTypeChange.call($("#glitch_type"));
   },
   7: (preset, do_highlight = false) => {
      updateInputField(
         $("#sticker_scale"),
         preset.config.scale * 100,
         do_highlight
      );
      updateInputField(
         $("#sticker_draw_mode"),
         preset.config.draw_mode,
         do_highlight
      );
      updateInputCheckbox(
         $("#sticker_sample_single_source"),
         preset.config.sample_single_source,
         do_highlight
      );
      updateInputField(
         $("#sticker_enabled_sources"),
         preset.config.enabled_sources.join(";"),
         do_highlight
      );
      updateInputCheckbox(
         $("#sticker_cluster"),
         preset.config.cluster,
         do_highlight
      );
      updateInputSelect(
         $("#sticker_cluster_preset_index"),
         preset.config.cluster_preset_index,
         do_highlight
      );
      updateInputCheckbox(
         $("#sticker_caption"),
         preset.config.caption,
         do_highlight
      );
      updateInputSelect(
         $("#sticker_caption_preset_index"),
         preset.config.caption_preset_index,
         do_highlight
      );
      updateInputCheckbox(
         $("#sticker_word_wall"),
         preset.config.word_wall,
         do_highlight
      );
      updateInputSelect(
         $("#sticker_word_wall_preset_index"),
         preset.config.word_wall_preset_index,
         do_highlight
      );
   },
   8: (preset, do_highlight = false) => {
      updateInputField($("#sobel_shape"), preset.config.shape, do_highlight);
      updateOnCensorShapeChange($("#sobel_shape"));
      updateInputField(
         $("#sobel_rounding"),
         preset.config.rounding,
         do_highlight
      );
      updateInputField(
         $("#sobel_scale"),
         preset.config.scale * 100,
         do_highlight
      );
      updateInputField(
         $("#sobel_feathering"),
         preset.config.feathering,
         do_highlight
      );
      updateInputField(
         $("#sobel_border_width"),
         preset.config.border_width,
         do_highlight
      );
      updateInputField(
         $("#sobel_border_color"),
         preset.config.border_color,
         do_highlight
      );
      $("#sobel_border_color").css(
         "background-color",
         preset.config.border_color
      );
      updateInputCheckbox(
         $("#sobel_inverted_color"),
         preset.config.inverted_color,
         do_highlight
      );
      updateInputCheckbox(
         $("#sobel_cluster"),
         preset.config.cluster,
         do_highlight
      );
      updateInputSelect(
         $("#sobel_cluster_preset_index"),
         preset.config.cluster_preset_index,
         do_highlight
      );
      updateInputCheckbox(
         $("#sobel_caption"),
         preset.config.caption,
         do_highlight
      );
      updateInputSelect(
         $("#sobel_caption_preset_index"),
         preset.config.caption_preset_index,
         do_highlight
      );
      updateInputCheckbox(
         $("#sobel_word_wall"),
         preset.config.word_wall,
         do_highlight
      );
      updateInputSelect(
         $("#sobel_word_wall_preset_index"),
         preset.config.word_wall_preset_index,
         do_highlight
      );
   },
   9: (preset, do_highlight = false) => {
      updateInputField(
         $("#splatter_scale"),
         preset.config.scale * 100,
         do_highlight
      );
      updateInputField(
         $("#splatter_color_mode"),
         preset.config.color_mode,
         do_highlight
      );
      updateInputField(
         $("#splatter_opacity"),
         preset.config.opacity * 100,
         do_highlight
      );
      for (let i = 0; i < preset.config.color_pool.length; i++) {
         updateInputField(
            $(`#splatter_color_pool_color_${i}`),
            preset.config.color_pool[i].color,
            do_highlight
         );
         $(`#splatter_color_pool_color_${i}`).css(
            "background-color",
            preset.config.color_pool[i].color
         );
         updateInputField(
            $(`#splatter_color_pool_weight_${i}`),
            preset.config.color_pool[i].weight,
            do_highlight
         );
      }
      updateInputField(
         $("#splatter_centering"),
         preset.config.centering,
         do_highlight
      );
      updateInputField(
         $("#splatter_size"),
         preset.config.size * 100,
         do_highlight
      );
      updateInputField(
         $("#splatter_amount"),
         preset.config.amount,
         do_highlight
      );
      updateInputField(
         $("#splatter_sub_size"),
         preset.config.sub_size * 100,
         do_highlight
      );
      updateInputField(
         $("#splatter_sub_amount"),
         preset.config.sub_amount,
         do_highlight
      );
      updateInputField(
         $("#splatter_recursions"),
         preset.config.recursions,
         do_highlight
      );
      updateInputCheckbox(
         $("#splatter_cluster"),
         preset.config.cluster,
         do_highlight
      );
      updateInputSelect(
         $("#splatter_cluster_preset_index"),
         preset.config.cluster_preset_index,
         do_highlight
      );
      updateInputCheckbox(
         $("#splatter_caption"),
         preset.config.caption,
         do_highlight
      );
      updateInputSelect(
         $("#splatter_caption_preset_index"),
         preset.config.caption_preset_index,
         do_highlight
      );
      updateInputCheckbox(
         $("#splatter_word_wall"),
         preset.config.word_wall,
         do_highlight
      );
      updateInputSelect(
         $("#splatter_word_wall_preset_index"),
         preset.config.word_wall_preset_index,
         do_highlight
      );

      updateOnSplatterColorModeChange.call($("#splatter_color_mode"));
   },
   10: (preset, do_highlight = false) => {
      for (let label_type = 0; label_type < ALL_LABELS_COUNT; label_type++) {
         const $mixed_entries_row = $(
            `#mixed_setting_group .mixed-entries-row[data-label-type="${label_type}"]`
         );
         for (let index = 0; index < MIXED_CENSOR_LAYERS_COUNT; index++) {
            const censor_type = preset.config.censor_types[label_type][index];
            const $mixed_entry = $mixed_entries_row.find(
               `.mixed-entry[data-index="${index}"`
            );
            if (censor_type == null) {
               removeMixedCensorType($mixed_entry, do_highlight);
            } else {
               setMixedCensorType($mixed_entry, censor_type, do_highlight);
               setMixedPreset(
                  $mixed_entry.find(".mixed-entry-select"),
                  censor_type === 0
                     ? null
                     : preset.config.censor_preset_indexes[label_type][index],
                  do_highlight
               );
            }
         }
      }
      const $mixed_entries_row = $(
         `#mixed_setting_group .mixed-entries-row[data-reverse-type]`
      );
      for (let index = 0; index < MIXED_CENSOR_LAYERS_COUNT; index++) {
         const censor_type = preset.config.reverse_censor_types[index];
         const $mixed_entry = $mixed_entries_row.find(
            `.mixed-entry[data-index="${index}"`
         );
         if (censor_type == null) {
            removeMixedCensorType($mixed_entry, do_highlight);
         } else {
            setMixedCensorType($mixed_entry, censor_type, do_highlight);
            setMixedPreset(
               $mixed_entry.find(".mixed-entry-select"),
               censor_type === 0
                  ? null
                  : preset.config.reverse_censor_preset_indexes[index],
               do_highlight
            );
         }
      }
   },
   11: (preset, do_highlight = false) => {
      updateInputRadio(
         $('[name="random_mode"]'),
         preset.config.mode,
         do_highlight
      );
      for (const key in preset.config.censor_weights) {
         updateInputField(
            $(`input.random-chance[data-censor-type=${key}]`),
            preset.config.censor_weights[key],
            do_highlight
         );
      }
   },
};

function updateClusterPresetConfig(preset, do_highlight = false) {
   updateInputField(
      $(`#clustering_max_distance`),
      preset.config.max_distance * 100,
      do_highlight
   );
   updateInputCheckbox(
      $(`#clustering_only_matching_content`),
      preset.config.only_matching_content,
      do_highlight
   );
   updateInputCheckbox(
      $(`#clustering_rotation`),
      preset.config.rotation,
      do_highlight
   );
}

function updateWordWallPresetConfig(preset, do_highlight = false) {
   $("#word_wall_word_pool").val(preset.config.word_pool.join("\n"));
   updateInputRadio(
      $(`[name="word_wall_draw_mode"]`),
      preset.config.draw_mode,
      do_highlight
   );
   updateInputField($("#word_wall_size"), preset.config.size, do_highlight);

   updateInputField(
      $("#word_wall_horizontal_spacing"),
      preset.config.horizontal_spacing,
      do_highlight
   );
   updateInputField(
      $("#word_wall_vertical_spacing"),
      preset.config.vertical_spacing * 100,
      do_highlight
   );
   updateInputField($("#word_wall_offset"), preset.config.offset, do_highlight);
   updateInputField($("#word_wall_angle"), preset.config.angle, do_highlight);
   updateInputField($("#word_wall_font"), preset.config.font, do_highlight);
   updateInputField(
      $("#word_wall_font_style"),
      preset.config.font_style,
      do_highlight
   );
   updateInputField(
      $("#word_wall_color_mode"),
      preset.config.color_mode,
      do_highlight
   );
   updateInputField($("#word_wall_color"), preset.config.color, do_highlight);
   $("#word_wall_color").css("background-color", preset.config.color);

   onWordWallColorModeChange();
}

const saveCensorTypePresetConfig = {
   0: null,
   1: (preset) => {
      preset.config = new PixelCensorTypePresetConfig(
         parseFloat($("#pixel_shape").val()),
         parseFloat($("#pixel_rounding").val()),
         parseFloat($("#pixel_scale").val()) / 100,
         parseFloat($("#pixel_feathering").val()),
         parseFloat($("#pixel_border_width").val()),
         $("#pixel_border_color").val(),
         parseFloat($("#pixel_type").val()),
         parseFloat($("#pixel_strength").val()),
         parseFloat($("#pixel_grid_width").val()),
         $("#pixel_grid_color").val(),
         parseFloat($("#pixel_density").val()) / 100,
         $("#pixel_color").val(),
         $("#pixel_bg_color").val(),
         parseFloat($("#pixel_channel_colors").val()),
         $("#pixel_grayscale").is(":checked"),
         $("#pixel_scale_with_detection").is(":checked"),
         $("#pixel_accurate_sampling").is(":checked"),
         parseInt($("#pixel_color_mode").val()),
         $("#pixel_cluster").is(":checked"),
         parseInt($("#pixel_cluster_preset_index").attr("value")),
         $("#pixel_caption").is(":checked"),
         parseInt($("#pixel_caption_preset_index").attr("value")),
         $("#pixel_word_wall").is(":checked"),
         parseInt($("#pixel_word_wall_preset_index").attr("value"))
      );
   },
   2: (preset) => {
      preset.config = new BlurCensorTypePresetConfig(
         parseFloat($("#blur_shape").val()),
         parseFloat($("#blur_rounding").val()),
         parseFloat($("#blur_scale").val()) / 100,
         parseFloat($("#blur_feathering").val()),
         parseFloat($("#blur_border_width").val()),
         $("#blur_border_color").val(),
         parseInt($("#blur_type").val()),
         parseFloat($("#blur_strength").val()),
         $("#blur_grayscale").is(":checked"),
         $("#blur_cluster").is(":checked"),
         parseInt($("#blur_cluster_preset_index").attr("value")),
         $("#blur_caption").is(":checked"),
         parseInt($("#blur_caption_preset_index").attr("value")),
         $("#blur_word_wall").is(":checked"),
         parseInt($("#blur_word_wall_preset_index").attr("value"))
      );
   },
   3: (preset) => {
      preset.config = new BarCensorTypePresetConfig(
         parseFloat($("#bar_shape").val()),
         parseFloat($("#bar_rounding").val()),
         parseFloat($("#bar_scale").val()) / 100,
         parseFloat($("#bar_feathering").val()),
         parseFloat($("#bar_border_width").val()),
         $("#bar_border_color").val(),
         parseFloat($("#bar_type").val()),
         $("#bar_color").val(),
         parseFloat($("#bar_opacity").val()) / 100,
         $("#bar_cluster").is(":checked"),
         parseInt($("#bar_cluster_preset_index").attr("value")),
         $("#bar_caption").is(":checked"),
         parseInt($("#bar_caption_preset_index").attr("value")),
         $("#bar_word_wall").is(":checked"),
         parseInt($("#bar_word_wall_preset_index").attr("value"))
      );
   },
   4: (preset) => {
      preset.config = new TriangleCensorTypePresetConfig(
         parseFloat($("#triangle_shape").val()),
         parseFloat($("#triangle_rounding").val()),
         parseFloat($("#triangle_scale").val()) / 100,
         parseFloat($("#triangle_feathering").val()),
         parseFloat($("#triangle_border_width").val()),
         $("#triangle_border_color").val(),
         parseFloat($("#triangle_vertex_count").val()),
         parseFloat($("#triangle_threshold").val()),
         parseFloat($("#triangle_accuracy").val()) / 100 ?? 0,
         parseFloat($("#triangle_blurring").val()),
         parseFloat($("#triangle_fill_color_mode").val()),
         $("#triangle_fill_color").val(),
         parseFloat($("#triangle_stroke_color_mode").val()),
         $("#triangle_stroke_color").val(),
         parseFloat($("#triangle_stroke_width").val()),
         $("#triangle_gradients").is(":checked"),
         parseFloat($("#triangle_gradient_stops").val()),
         parseFloat($("#triangle_line_join").val()),
         $("#triangle_transparent_color").is(":checked"),
         $("#triangle_cluster").is(":checked"),
         parseInt($("#triangle_cluster_preset_index").attr("value")),
         $("#triangle_caption").is(":checked"),
         parseInt($("#triangle_caption_preset_index").attr("value")),
         $("#triangle_word_wall").is(":checked"),
         parseInt($("#triangle_word_wall_preset_index").attr("value"))
      );
   },
   5: (preset) => {
      preset.config = new BoxCensorTypePresetConfig(
         parseFloat($("#box_scale").val()) / 100,
         parseFloat($("#box_display").val()),
         $("#box_fill_color").val(),
         $("#box_border_color").val(),
         $("#box_cluster").is(":checked"),
         parseInt($("#box_cluster_preset_index").attr("value")),
         $("#box_caption").is(":checked"),
         parseInt($("#box_caption_preset_index").attr("value")),
         $("#box_word_wall").is(":checked"),
         parseInt($("#box_word_wall_preset_index").attr("value"))
      );
   },
   6: (preset) => {
      const gradient = new Array(4);
      for (let i = 0; i < gradient.length; i++) {
         gradient[i] = {
            color: $(`#glitch_multiple_panels_gradient_color_${i}`).val(),
            offset:
               parseFloat(
                  $(`#glitch_multiple_panels_gradient_offset_${i}`).val()
               ) / 100 ?? 0,
         };
      }
      preset.config = new GlitchCensorTypePresetConfig(
         parseFloat($("#glitch_type").val()),
         parseFloat($("#glitch_scale").val()) / 100,
         parseFloat($("#glitch_chromatic_aberration_color_intensity").val()) /
            100 ?? 0,
         parseFloat($("#glitch_chromatic_aberration_shift_intensity").val()) /
            100 ?? 0,
         $("#glitch_chromatic_aberration_horizontal_shift").is(":checked"),
         $("#glitch_chromatic_aberration_vertical_shift").is(":checked"),
         parseFloat($("#glitch_multiple_panels_amount").val()),
         parseFloat($("#glitch_multiple_panels_min_size").val()) / 100,
         parseFloat($("#glitch_multiple_panels_max_size").val()) / 100,
         parseFloat($("#glitch_multiple_panels_scatter").val()) / 100 ?? 0,
         parseFloat($("#glitch_multiple_panels_split_chance").val()) / 100 ?? 0,
         $("#glitch_multiple_panels_border").is(":checked"),
         gradient,
         $("#glitch_cluster").is(":checked"),
         parseInt($("#glitch_cluster_preset_index").attr("value")),
         $("#glitch_caption").is(":checked"),
         parseInt($("#glitch_caption_preset_index").attr("value")),
         $("#glitch_word_wall").is(":checked"),
         parseInt($("#glitch_word_wall_preset_index").attr("value"))
      );
   },
   7: (preset) => {
      preset.config = new StickerCensorTypePresetConfig(
         parseFloat($("#sticker_scale").val()) / 100,
         parseFloat($("#sticker_draw_mode").val()),
         $("#sticker_sample_single_source").is(":checked"),
         $("#sticker_enabled_sources")
            .val()
            .split(";")
            .filter((item) => item),
         $("#sticker_cluster").is(":checked"),
         parseInt($("#sticker_cluster_preset_index").attr("value")),
         $("#sticker_caption").is(":checked"),
         parseInt($("#sticker_caption_preset_index").attr("value")),
         $("#sticker_word_wall").is(":checked"),
         parseInt($("#sticker_word_wall_preset_index").attr("value"))
      );
   },
   8: (preset) => {
      preset.config = new SobelCensorTypePresetConfig(
         parseFloat($("#sobel_shape").val()),
         parseFloat($("#sobel_rounding").val()),
         parseFloat($("#sobel_scale").val()) / 100,
         parseFloat($("#sobel_feathering").val()),
         parseFloat($("#sobel_border_width").val()),
         $("#sobel_border_color").val(),
         $("#sobel_inverted_color").is(":checked"),
         $("#sobel_cluster").is(":checked"),
         parseInt($("#sobel_cluster_preset_index").attr("value")),
         $("#sobel_caption").is(":checked"),
         parseInt($("#sobel_caption_preset_index").attr("value")),
         $("#sobel_word_wall").is(":checked"),
         parseInt($("#sobel_word_wall_preset_index").attr("value"))
      );
   },
   9: (preset) => {
      const color_pool = new Array(SPLATTER_COLOR_POOL_ENTRIES_COUNT);
      for (let i = 0; i < color_pool.length; i++) {
         color_pool[i] = {
            color: $(`#splatter_color_pool_color_${i}`).val(),
            weight: parseFloat($(`#splatter_color_pool_weight_${i}`).val()),
         };
      }
      preset.config = new SplatterCensorTypePresetConfig(
         parseFloat($("#splatter_scale").val()) / 100,
         parseFloat($("#splatter_color_mode").val()),
         parseFloat($("#splatter_opacity").val()) / 100 ?? 0,
         color_pool,
         parseFloat($("#splatter_centering").val()),
         parseFloat($("#splatter_size").val()) / 100,
         parseFloat($("#splatter_amount").val()),
         parseFloat($("#splatter_sub_size").val()) / 100,
         parseFloat($("#splatter_sub_amount").val()),
         parseFloat($("#splatter_recursions").val()),
         $("#splatter_cluster").is(":checked"),
         parseInt($("#splatter_cluster_preset_index").attr("value")),
         $("#splatter_caption").is(":checked"),
         parseInt($("#splatter_caption_preset_index").attr("value")),
         $("#splatter_word_wall").is(":checked"),
         parseInt($("#splatter_word_wall_preset_index").attr("value"))
      );
   },
   10: (preset) => {
      let censor_types = {},
         censor_preset_indexes = {};
      for (let label_type = 0; label_type < ALL_LABELS_COUNT; label_type++) {
         censor_types[label_type] = new Array(MIXED_CENSOR_LAYERS_COUNT);
         censor_preset_indexes[label_type] = new Array(
            MIXED_CENSOR_LAYERS_COUNT
         );
         const $mixed_entries_row = $(
            `#mixed_setting_group .mixed-entries-row[data-label-type="${label_type}"]`
         );
         for (let index = 0; index < MIXED_CENSOR_LAYERS_COUNT; index++) {
            const $mixed_entry = $mixed_entries_row.find(
               `.mixed-entry[data-index="${index}"`
            );
            const censor_type = parseInt($mixed_entry.attr("data-censor-type"));

            censor_types[label_type][index] = !isNaN(censor_type)
               ? censor_type
               : undefined;
            const censor_preset_index = parseInt(
               $mixed_entry.find(".mixed-entry-select").attr("value")
            );
            censor_preset_indexes[label_type][index] = !isNaN(
               censor_preset_index
            )
               ? censor_preset_index
               : undefined;
         }
      }
      let reverse_censor_types = new Array(MIXED_CENSOR_LAYERS_COUNT);
      let reverse_censor_preset_indexes = new Array(MIXED_CENSOR_LAYERS_COUNT);
      const $mixed_entries_row = $(
         `#mixed_setting_group .mixed-entries-row[data-reverse-type]`
      );
      for (let index = 0; index < MIXED_CENSOR_LAYERS_COUNT; index++) {
         const $mixed_entry = $mixed_entries_row.find(
            `.mixed-entry[data-index="${index}"`
         );
         const censor_type = parseInt($mixed_entry.attr("data-censor-type"));

         reverse_censor_types[index] = !isNaN(censor_type)
            ? censor_type
            : undefined;
         const censor_preset_index = parseInt(
            $mixed_entry.find(".mixed-entry-select").attr("value")
         );
         reverse_censor_preset_indexes[index] = !isNaN(censor_preset_index)
            ? censor_preset_index
            : undefined;
      }
      preset.config = new MixedCensorTypePresetConfig(
         censor_types,
         censor_preset_indexes,
         reverse_censor_types,
         reverse_censor_preset_indexes
      );
   },
   11: (preset) => {
      let censor_weights = {};
      $("input.random-chance").each(function () {
         censor_weights[$(this).attr("data-censor-type")] = parseFloat(
            $(this).val()
         );
      });
      preset.config = new RandomCensorTypePresetConfig(
         parseFloat($('[name="random_mode"]:checked').val()),
         censor_weights
      );
   },
};

function saveClusterPresetConfig(preset) {
   preset.config = new ClusteringPresetConfiguration(
      parseFloat($("#clustering_max_distance").val()) / 100 ?? 0,
      $("#clustering_only_matching_content").is(":checked"),
      $("#clustering_rotation").is(":checked")
   );
}

function saveCaptionPresetConfig(preset) {
   preset.config = new CaptionPresetConfiguration(
      preset.config.tags,
      preset.config.entries,
      parseFloat($("#caption_mode").val()),
      $("#caption_color").val(),
      $("#caption_font").val(),
      $("#caption_font_style").val(),
      parseFloat($("#caption_shadow_size").val()),
      $("#caption_shadow_color").val(),
      parseFloat($("#caption_line_height").val()) / 100 ?? 0,
      parseFloat($("#caption_padding").val())
   );
}

function saveWordWallPresetConfig(preset) {
   preset.config = new WordWallPresetConfiguration(
      $("#word_wall_word_pool")
         .val()
         .split("\n")
         .filter((item) => item),
      parseFloat($('[name="word_wall_draw_mode"]:checked').val()),
      $("#word_wall_font").val(),
      $("#word_wall_font_style").val(),
      parseFloat($("#word_wall_size").val()),
      parseFloat($("#word_wall_horizontal_spacing").val()),
      parseFloat($("#word_wall_vertical_spacing").val()) / 100,
      parseFloat($("#word_wall_offset").val()),
      parseFloat($("#word_wall_angle").val()),
      parseFloat($("#word_wall_color_mode").val()),
      $("#word_wall_color").val()
   );
}

async function selectPreset($tab_preset) {
   await requesting_config;

   let $tab_preset_group = $tab_preset.closest(".presets");
   const index = parseInt($tab_preset.attr("data-index"));

   let config;
   if ($tab_preset_group.attr("data-caption-censor-extra")) {
      config = caption_configuration;
      config.selectedPresetIndex = index;

      restoreConfig();
      saveConfig();
   } else {
      if ($tab_preset_group.attr("data-censor-type")) {
         const censor_type = parseInt(
            $tab_preset_group.attr("data-censor-type")
         );
         const censor_configs_by_type = {
            1: pixel_configuration,
            2: blur_configuration,
            3: bar_configuration,
            4: triangle_configuration,
            5: box_configuration,
            6: glitch_configuration,
            7: sticker_configuration,
            8: sobel_configuration,
            9: splatter_configuration,
            10: mixed_configuration,
            11: random_configuration,
         };
         config = censor_configs_by_type[censor_type];
      } else if ($tab_preset_group.attr("data-cluster-censor-extra")) {
         config = clustering_configuration;
      } else if ($tab_preset_group.attr("data-word-wall-censor-extra")) {
         config = word_wall_configuration;
      }
      config.selectedPresetIndex = index;

      restoreConfig();
      saveConfig();
   }
}

function shiftSelectedPresetIndexOnDeletion(curr, deleted) {
   // If the removed preset was below the set preset, shift the preset index down by one
   if (deleted < curr) {
      return curr - 1;
   } // If the removed preset was the set preset, reset the preset index to zero
   else if (curr === deleted) {
      return 0;
   } else {
      return curr;
   }
}

async function deletePreset($tab_preset) {
   await requesting_config;

   if (!$tab_preset.siblings(".tab-preset").length) return;

   const $tab_preset_group = $tab_preset.closest(".presets");
   const index = parseInt($tab_preset.attr("data-index"));

   let config;
   if ($tab_preset_group.attr("data-caption-censor-extra")) {
      config = caption_configuration;

      config.presets.splice(index, 1);
      if (config.selectedPresetIndex === index) {
         config.selectedPresetIndex = 0;
      } else if (index < config.selectedPresetIndex) {
         config.selectedPresetIndex--;
      }

      restoreCaptionConfig();
      saveCaptionConfig();
   } else {
      if ($tab_preset_group.attr("data-censor-type")) {
         const censor_type = parseInt(
            $tab_preset_group.attr("data-censor-type")
         );
         const censor_configs_by_type = {
            1: pixel_configuration,
            2: blur_configuration,
            3: bar_configuration,
            4: triangle_configuration,
            5: box_configuration,
            6: glitch_configuration,
            7: sticker_configuration,
            8: sobel_configuration,
            9: splatter_configuration,
            10: mixed_configuration,
            11: random_configuration,
         };
         config = censor_configs_by_type[censor_type];

         for (let preset of mixed_configuration.presets) {
            if (preset == null) continue;

            for (let layer = 0; layer < MIXED_CENSOR_LAYERS_COUNT; layer++) {
               if (preset.config.reverse_censor_types[layer] === censor_type) {
                  preset.config.reverse_censor_preset_indexes[layer] =
                     shiftSelectedPresetIndexOnDeletion(
                        preset.config.reverse_censor_preset_indexes[layer],
                        index
                     );
               }

               for (let label_type in preset.config.censor_types) {
                  if (
                     preset.config.censor_types[label_type][layer] ===
                     censor_type
                  ) {
                     preset.config.censor_preset_indexes[label_type][layer] =
                        shiftSelectedPresetIndexOnDeletion(
                           preset.config.censor_preset_indexes[label_type][
                              layer
                           ],
                           index
                        );
                  }
               }
            }
         }

         if (
            only_once_mode_configuration.mode_configuration[7].censor_type ==
            censor_type
         ) {
            only_once_mode_configuration.mode_configuration[7].censor_preset_index =
               shiftSelectedPresetIndexOnDeletion(
                  only_once_mode_configuration.mode_configuration[7]
                     .censor_preset_index,
                  index
               );
         }
      } else if ($tab_preset_group.attr("data-cluster-censor-extra")) {
         config = clustering_configuration;
      } else if ($tab_preset_group.attr("data-word-wall-censor-extra")) {
         config = word_wall_configuration;
      }

      config.presets.splice(index, 1);
      if (config.selectedPresetIndex === index) {
         config.selectedPresetIndex = 0;
      } else if (index < config.selectedPresetIndex) {
         config.selectedPresetIndex--;
      }

      restoreConfig();
      saveConfig();
   }
}

function deleteTabPreset($tab_preset) {
   $tab_preset.remove();
}

async function createPreset($tab_preset_group) {
   await requesting_config;

   const $tab_presets = $tab_preset_group.children(".tab-preset");
   if (MAX_CENSOR_PRESETS <= $tab_presets.length) return;

   const index = $tab_presets.length;

   let config;
   if ($tab_preset_group.attr("data-caption-censor-extra")) {
      config = caption_configuration;
      config.presets[index] = new CensorPreset(
         new CaptionPresetConfiguration(),
         "Preset " + (index + 1)
      );
      config.selectedPresetIndex = index;

      restoreCaptionConfig();
      saveCaptionConfig();
   } else {
      if ($tab_preset_group.attr("data-censor-type")) {
         const censor_type = parseInt(
            $tab_preset_group.attr("data-censor-type")
         );
         const censor_configs_by_type = {
            1: pixel_configuration,
            2: blur_configuration,
            3: bar_configuration,
            4: triangle_configuration,
            5: box_configuration,
            6: glitch_configuration,
            7: sticker_configuration,
            8: sobel_configuration,
            9: splatter_configuration,
            10: mixed_configuration,
            11: random_configuration,
         };
         config = censor_configs_by_type[censor_type];
         config.presets[index] = createDefaultCensorTypePreset[censor_type](
            "Preset " + (index + 1)
         );
      } else if ($tab_preset_group.attr("data-cluster-censor-extra")) {
         config = clustering_configuration;
         config.presets[index] = new CensorPreset(
            new ClusteringPresetConfiguration(),
            "Preset " + (index + 1)
         );
      } else if ($tab_preset_group.attr("data-word-wall-censor-extra")) {
         config = word_wall_configuration;
         config.presets[index] = new CensorPreset(
            new WordWallPresetConfiguration(),
            "Preset " + (index + 1)
         );
      }
      config.selectedPresetIndex = index;

      restoreConfig();
      saveConfig();
   }
}

function createTabPreset($tab_preset_group, name = "") {
   const $tab_presets = $tab_preset_group.children(".tab-preset");

   const $new_tab_preset = $(`
      <li class="tab-preset save-config" data-index="0">
         <input class="tab-edit-field save-config" type="text" maxlength="15"/><div class="tab-preset-x">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12">
                  <path d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z"/>
               </svg>
         </div>
      </li>`);
   $new_tab_preset.insertBefore($tab_preset_group.find(".tab-preset-plus"));
   $new_tab_preset.attr("data-index", $tab_presets.length);
   $new_tab_preset.children("input").val(name);

   return $new_tab_preset;
}

async function setPresetName($tab_preset, name) {
   await requesting_config;

   const $tab_preset_group = $tab_preset.closest(".presets");
   const index = parseInt($tab_preset.attr("data-index"));

   let config;
   if ($tab_preset_group.attr("data-caption-censor-extra")) {
      config = caption_configuration;
      config.presets[index].name = name;

      restoreCaptionConfig();
      saveCaptionConfig();
   } else {
      if ($tab_preset_group.attr("data-censor-type")) {
         const censor_type = parseInt(
            $tab_preset_group.attr("data-censor-type")
         );
         const censor_configs_by_type = {
            1: pixel_configuration,
            2: blur_configuration,
            3: bar_configuration,
            4: triangle_configuration,
            5: box_configuration,
            6: glitch_configuration,
            7: sticker_configuration,
            8: sobel_configuration,
            9: splatter_configuration,
            10: mixed_configuration,
            11: random_configuration,
         };
         config = censor_configs_by_type[censor_type];
      } else if ($tab_preset_group.attr("data-cluster-censor-extra")) {
         config = clustering_configuration;
      } else if ($tab_preset_group.attr("data-word-wall-censor-extra")) {
         config = word_wall_configuration;
      }
      config.presets[index].name = name;

      restoreConfig();
      saveConfig();
   }
}

function updatePresets($tab_preset_group, config, updatePresetConfig) {
   for (let i = 0; i < MAX_CENSOR_PRESETS; i++) {
      if (config.presets[i] != null) {
         const $preset_tab = $tab_preset_group.find(
            `.tab-preset[data-index="${i}"]`
         );
         if ($preset_tab.length) {
            $preset_tab.find("input").val(config.presets[i].name);
         } else {
            createTabPreset($tab_preset_group, config.presets[i].name);
         }
      } else {
         deleteTabPreset(
            $tab_preset_group.find(`.tab-preset[data-index="${i}`)
         );
      }

      const $tab_preset = $tab_preset_group.find(
         `.tab-preset[data-index="${config.selectedPresetIndex}"]`
      );
      $tab_preset.siblings(".tab-preset").removeClass("tab-preset-selected");
      $tab_preset.addClass("tab-preset-selected");

      updatePresetConfig(config.presets[config.selectedPresetIndex]);
   }
}

$(document)
   .on("click", ".tab-preset-plus", function (e) {
      createPreset($(e.target).closest(".presets"));
   })
   .on("click", ".tab-preset-x", function (e) {
      deletePreset($(e.target).closest(".tab-preset"));
   })
   .on("click", ".tab-preset", function (e) {
      if ($(e.target).closest(".tab-preset-x, .tab-edit-field").length) return;
      selectPreset($(e.target).closest(".tab-preset"));
   })
   .on("change", ".tab-edit-field", function (e) {
      const $input = $(e.target);
      setPresetName($input.closest(".tab-preset"), $input.val());
   });

function selectAccordionTab(tab_el) {
   let name = tab_el.attr("name");
   let accordion_buttons_el = tab_el.closest(".general-accordion-buttons");
   let censor_type = parseInt(accordion_buttons_el.attr("data-censor-type"));
   let accordion_container_el = $(
      `.general-accordion-container[data-censor-type="${censor_type}"]`
   );

   accordion_buttons_el
      .find(".tab-accordion")
      .removeClass("tab-accordion-selected");
   tab_el.addClass("tab-accordion-selected");
   if (name === "general") {
      accordion_container_el.find(".general-settings").show();
      accordion_container_el.find(".general-settings-extras").hide();
   } else {
      accordion_container_el.find(".general-settings").hide();
      accordion_container_el.find(".general-settings-extras").show();
   }
}

$(document).on("click", ".tab-accordion", function (e) {
   selectAccordionTab($(e.target).closest(".tab-accordion"));
});

let preset_config_clipboard = null;

$(".copy-button").click(function (e) {
   let censor_preset, config_key;
   if ($(this).parent().attr("data-censor-type")) {
      const censor_type = parseInt($(this).parent().attr("data-censor-type"));
      const censor_configs_by_type = {
         1: pixel_configuration,
         2: blur_configuration,
         3: bar_configuration,
         4: triangle_configuration,
         5: box_configuration,
         6: glitch_configuration,
         7: sticker_configuration,
         8: sobel_configuration,
         9: splatter_configuration,
         10: mixed_configuration,
         11: random_configuration,
      };
      censor_preset = getSelectedPreset(censor_configs_by_type[censor_type]);
      config_key = effects_by_index[censor_type].config_key;
   } else if ($(this).parent().attr("data-cluster-censor-extra")) {
      censor_preset = getSelectedPreset(clustering_configuration);
      config_key = "clustering_configuration";
   } else if ($(this).parent().attr("data-caption-censor-extra")) {
      censor_preset = getSelectedPreset(caption_configuration);
      config_key = "caption_configuration";
   } else if ($(this).parent().attr("data-word-wall-censor-extra")) {
      censor_preset = getSelectedPreset(word_wall_configuration);
      config_key = "word_wall_configuration";
   }

   preset_config_clipboard = {
      config_key: config_key,
      preset_config: structuredClone(censor_preset.config),
   };
});

$(".paste-button").click(function (e) {
   if (preset_config_clipboard == null) return;

   if ($(this).parent().attr("data-censor-type")) {
      const censor_type = parseInt($(this).parent().attr("data-censor-type"));
      const censor_configs_by_type = {
         1: pixel_configuration,
         2: blur_configuration,
         3: bar_configuration,
         4: triangle_configuration,
         5: box_configuration,
         6: glitch_configuration,
         7: sticker_configuration,
         8: sobel_configuration,
         9: splatter_configuration,
         10: mixed_configuration,
         11: random_configuration,
      };
      censor_preset = getSelectedPreset(censor_configs_by_type[censor_type]);
      pastePresetConfig(
         effects_by_index[censor_type].config_key,
         censor_preset.config,
         preset_config_clipboard.config_key,
         preset_config_clipboard.preset_config
      );
      updateCensorTypePresetConfig[censor_type](censor_preset, true);
      saveConfig();
   } else if ($(this).parent().attr("data-cluster-censor-extra")) {
      censor_preset = getSelectedPreset(clustering_configuration);
      pastePresetConfig(
         "clustering_configuration",
         censor_preset.config,
         preset_config_clipboard.config_key,
         preset_config_clipboard.preset_config
      );
      updateClusterPresetConfig(censor_preset, true);
      saveConfig();
   } else if ($(this).parent().attr("data-caption-censor-extra")) {
      censor_preset = getSelectedPreset(caption_configuration);
      pastePresetConfig(
         "caption_configuration",
         censor_preset.config,
         preset_config_clipboard.config_key,
         preset_config_clipboard.preset_config
      );
      updateCaptionPresetConfig(censor_preset, true);
      saveCaptionConfig();
   } else if ($(this).parent().attr("data-word-wall-censor-extra")) {
      censor_preset = getSelectedPreset(word_wall_configuration);
      pastePresetConfig(
         "word_wall_configuration",
         censor_preset.config,
         preset_config_clipboard.config_key,
         preset_config_clipboard.preset_config
      );
      updateWordWallPresetConfig(censor_preset, true);
      saveConfig();
   }
});

function pastePresetConfig(
   config_key,
   preset_config,
   other_config_key,
   other_preset_config
) {
   function copyKey(key, preset_config, other_preset_config) {
      let input = $(`#${config_key.replace("_configuration", "")}_${key}`);
      let other_input = $(
         `#${other_config_key.replace("_configuration", "")}_${key}`
      );
      // if (!input.length || !other_input.length) return;

      if (input.is("select") && other_input.is("select")) {
         let options = input.find("option");
         let other_options = other_input.find("option");
         if (options.length !== other_options.length) return;
         for (let i = 0; i < options.length; i++) {
            if (options[i].innerText !== other_options[i].innerText) {
               return;
            }
         }
      } else if (
         input.is("input[type='number']") &&
         other_input.is("input[type='number']")
      ) {
         if (
            input.attr("data-input-type") !==
            other_input.attr("data-input-type")
         ) {
            return;
         }
         if (
            input.attr("data-input-range") !==
            other_input.attr("data-input-range")
         ) {
            return;
         }
         if (
            input.attr("data-input-precision") !==
            other_input.attr("data-input-precision")
         ) {
            return;
         }
      }
      // else if (input.is("input[type='checkbox']") && other_input.is("input[type='checkbox']")) {
      //    // No extra checks to perform
      // } else if (input.is("input[type='radio']") && other_input.is("input[type='radio']")) {
      //    // No extra checks to perform
      // }

      if (
         preset_config[key] !== undefined &&
         preset_config[key] !== other_preset_config[key]
      ) {
         preset_config[key] = structuredClone(other_preset_config[key]);
      }
   }

   let keys = Object.keys(other_preset_config);
   if (
      [
         "box_configuration",
         "glitch_configuration",
         "sticker_configuration",
         "splatter_configuration",
      ].includes(other_config_key)
   ) {
      keys = keys.filter((key) => !["shape", "feathering"].includes(key));
   } else if (
      ["random_configuration", "mixed_configuration"].includes(other_config_key)
   ) {
      keys = keys.filter(
         (key) => !["shape", "scale", "feathering"].includes(key)
      );
   }

   for (key of keys) {
      copyKey(key, preset_config, other_preset_config);
   }
}
