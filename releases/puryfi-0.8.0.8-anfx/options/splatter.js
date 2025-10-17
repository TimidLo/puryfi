const SPLATTER_COLOR_POOL_ENTRIES_COUNT = 6;

function updateOnSplatterColorModeChange() {
	$('#splatter_preview').find('#splatter_preset_name').html('');
	if ($(this).val() == 0) {
		$('#splatter_color_pool').closest('.general-setting').hide();
		$('#splatter_preset_and_preview').hide();
		$('#splatter_opacity').closest('.general-setting').show();
	} else {
		$('#splatter_opacity').closest('.general-setting').hide();
		$('#splatter_preset_and_preview').show();
		$('#splatter_color_pool').closest('.general-setting').show();
    previewSplatterPreset();
  }
}

$('#splatter_color_mode').change(updateOnSplatterColorModeChange);

$("#splatter_setting_group").on("change", function (e) {
  $('#splatter_preview').find('#splatter_preset_name').html('');
  previewSplatterPreset();
});

function previewSplatterPreset(){
  let entries = new Array(SPLATTER_COLOR_POOL_ENTRIES_COUNT);
  for (let i = 0; i < SPLATTER_COLOR_POOL_ENTRIES_COUNT; i++) {
      entries[i] = {
        color: $(`#splatter_color_pool_color_${i}`).val(),
        weight: parseFloat($(`#splatter_color_pool_weight_${i}`).val()),
      }
  }

  let total_weight = entries.reduce((weight_sum, entry) => weight_sum += entry.weight, 0);

  let $svg = $('#splatter_preview svg');
  $svg.empty();
  let curr_y = 0;
  for (let entry of entries) {
    let height = entry.weight * 60 / total_weight;
    $svg.append(`<rect y="${curr_y}" width="100" height="${height}" fill="${entry.color}"/>`);
    curr_y += height;
  }

  // "Refresh" the svg
  $svg.html($svg.html());
}

let splatter_preset_index = 0;

let splatter_presets = [
  [
      {"weight": 1, "color": "#FFFFFF"},
      {"weight": 1, "color": "#000000"},
  ],
  [
      {"weight": 1, "color": "#FFB900"},
      {"weight": 1, "color": "#000000"},
  ],
  [
      {"weight": 1, "color": "#3C3B6E"},
      {"weight": 1, "color": "#FFFFFF"},
      {"weight": 1, "color": "#B22234"},
  ],
  [
      {"weight": 1, "color": "#810DCF"},
      {"weight": 1, "color": "#EF2BBD"},
      {"weight": 1, "color": "#FBAB54"},
      {"weight": 1, "color": "#F2D843"},
      {"weight": 1, "color": "#1BC444"},
      {"weight": 1, "color": "#0F96CF"},
  ],
];

let splatter_preset_names = [
 'Black & White', 'Wasp', 'Stars & Stripes', 'Rainbow'
];

$('#splatter_preset_previous').click(function(){
  splatter_preset_index = splatter_preset_index-1;
  if(splatter_preset_index < 0){
      splatter_preset_index = splatter_presets.length-1;
  }
  loadSplatterPreset(splatter_preset_index);
});

$('#splatter_preset_next').click(function(){
  splatter_preset_index = (splatter_preset_index + 1) % splatter_presets.length;
  loadSplatterPreset(splatter_preset_index);
});

function loadSplatterPreset(index){
  $('#splatter_preview').find('#splatter_preset_name').html(splatter_preset_names[index]);
  
  const defaultColor = "#00000000";
  const defaultWeight = 0;
  for (let i = 0; i < SPLATTER_COLOR_POOL_ENTRIES_COUNT; i++) {
      updateInputField($(`#splatter_color_pool_color_${i}`),splatter_presets[index][i]?.color || defaultColor);
  $(`#splatter_color_pool_color_${i}`).css("background-color", splatter_presets[index][i]?.color || defaultColor);
      updateInputField($(`#splatter_color_pool_weight_${i}`), splatter_presets[index][i]?.weight || defaultWeight);
  }
  previewSplatterPreset();
  saveConfig();
}