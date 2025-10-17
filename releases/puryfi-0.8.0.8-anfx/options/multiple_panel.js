const GLITCH_MULTIPLE_PANELS_GRADIENT_ENTRIES_COUNT = 4;

$("#glitch_setting_group").on("change", function (e) {
    $('#glitch_multiple_panels_preview').find('#glitch_multiple_panels_preset_name').html('');
    previewGlitchMultiplePanelsPreset();
});

function previewGlitchMultiplePanelsPreset(){
    let stops = "";
    for (let i = 0; i < GLITCH_MULTIPLE_PANELS_GRADIENT_ENTRIES_COUNT; i++) {
        const color = $(`#glitch_multiple_panels_gradient_color_${i}`).val();
        const offset = parseFloat($(`#glitch_multiple_panels_gradient_offset_${i}`).val());
        stops += `, ${color} ${offset}%`;
    }

    const background_gradient_value = `radial-gradient(circle at top left${stops})`;
    $("#glitch_multiple_panels_preview").css({
        "background": background_gradient_value,
    });
}

let glitch_multiple_panels_preset_index = 0;

let glitch_multiple_panels_presets = [
    [
        {"offset": 0, "color": "#000000D7"},
        {"offset": 0, "color": "#000000D7"},
        {"offset": 0, "color": "#000000D7"},
        {"offset": 0, "color": "#000000D7"},
    ],
    [
        {"offset": 0.1, "color": "#63A3FF5F"},
        {"offset": 0.3, "color": "#B6DCFFCF"},
        {"offset": 0.7, "color": "#B6DCFFCF"},
        {"offset": 1, "color": "#72BEFF5F"},
    ],
    [
        {"offset": 0.05, "color": "#E2F7F49E"},
        {"offset": 0.25, "color": "#96E0DAB3"},
        {"offset": 0.55, "color": "#EACCF8B3"},
        {"offset": 0.85, "color": "#937EF3CD"},
    ],
    [
        {"offset": 0, "color": "#D2D4557F"},
        {"offset": 0.35, "color": "#4AF42ECD"},
        {"offset": 0.65, "color": "#D2D455CD"},
        {"offset": 1, "color": "#4AF42EE6"},
    ],
];

let glitch_multiple_panels_preset_names = [
   'Smoke', 'Mirrors', 'Cotton Candy', 'Green Grass'
];

let glitch_multiple_panels_preset_border = [
    false, true, false, false
];

$('#glitch_multiple_panels_preset_previous').click(function(){
    glitch_multiple_panels_preset_index = glitch_multiple_panels_preset_index-1;
    if(glitch_multiple_panels_preset_index < 0){
        glitch_multiple_panels_preset_index = glitch_multiple_panels_presets.length-1;
    }
    loadGlitchMultiplePanelsPreset(glitch_multiple_panels_preset_index);
});

$('#glitch_multiple_panels_preset_next').click(function(){
    glitch_multiple_panels_preset_index = (glitch_multiple_panels_preset_index + 1) % glitch_multiple_panels_presets.length;
    loadGlitchMultiplePanelsPreset(glitch_multiple_panels_preset_index);
});

function loadGlitchMultiplePanelsPreset(index){
    $('#glitch_multiple_panels_preview').find('#glitch_multiple_panels_preset_name').html(glitch_multiple_panels_preset_names[index]);
    $('#glitch_multiple_panels_border').prop('checked', glitch_multiple_panels_preset_border[index]);
    
    const defaultColor = "#00000000";
    const defaultOffset = 0;
    for (let i = 0; i < GLITCH_MULTIPLE_PANELS_GRADIENT_ENTRIES_COUNT; i++) {
        updateInputField($(`#glitch_multiple_panels_gradient_color_${i}`),glitch_multiple_panels_presets[index][i]?.color || defaultColor);
		$(`#glitch_multiple_panels_gradient_color_${i}`).css("background-color", glitch_multiple_panels_presets[index][i]?.color || defaultColor);
        updateInputField($(`#glitch_multiple_panels_gradient_offset_${i}`), (glitch_multiple_panels_presets[index][i]?.offset || defaultOffset) * 100);
    }
    previewGlitchMultiplePanelsPreset();
    saveConfig();
}