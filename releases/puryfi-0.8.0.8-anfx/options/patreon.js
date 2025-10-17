

$('#login_form').submit(function(){
    let name = $('#login_username').val();
    let pwd = $('#login_password').val();
    if(name.length > 0 && pwd.length > 0){
        communityLogin(name, pwd);
    }
    return false;
});

$('#logout_button').click(function(){
    communityLogout();
});

$('#profile-refresh').click(function(){
    if(!$(this).prop("disabled")) {
        $('#profile-refresh').prop("disabled", true);
        $('#profile-refresh').addClass('rotate');
        let user_req = browser.storage.sync.get(['user']);
        user_req.then((res) => {
            if (res.user.username != null && res.user.password != null) {
                communityLogin(res.user.username, res.user.password);
                setTimeout(function () {
                    $('#profile-refresh').prop("disabled", false);
                    $('#profile-refresh').removeClass('rotate');
                }, 2000);
            }
        });
    }
});

function communityLogin(username, password) {
    $("#login_form :input").prop("disabled", true);
    var sending = browser.runtime.sendMessage({
        login: true,
        username: username,
        password: password
    });
    sending.then(handleLogin, handleError);
}

function communityLogout() {
    var sending = browser.runtime.sendMessage({
        logout: true,
    });
    sending.then(async function() {
        await requesting_config;
        user = null;
        restoreLoginState();
        lockContent();
        restoreMascot(null, $("#language").val());
    }, handleError);

}

function handleLogin(message) {
    if(message){
        if(message.user != null){
            loginSuccess(message.user);
            restoreMascot(message.user, $("#language").val());
        }else{
            $("#login_form :input").prop("disabled", false);
            $("#login_message").html('Something went wrong');
        }
    }
}

function handleError(error) {
    console.trace();
    console.log(`Error: ${error}`);
}

function loginSuccess(user) {
	$('#video_overlay_log_in_warning').hide();
    $("#login_form").hide();
    $("#profile").show("slow");
    $("#profile_name").html(user.username);
    if(user.patreon_cache){
        $("#profile_message").show();
    }else{
        $("#profile_message").hide();
    }
    $("#profile_tier").html(user.patreon_tier_name);
    unlock(user);
}

function unlock(user){
    if(user != null){
        $(".user_locked").addClass('user_unlocked');
        $(".user_locked").removeClass('user_locked');
        $("a[content='content-cloud']").show();
        $("#remote-settings").show();
    }
    if(user != null && user.permissions.permission_file_type_gif <= user.patreon_tier){
        $(".patreon_gif").removeClass('patreon_locked');
        $(".patreon_gif").addClass('patreon_unlocked');
    }else{
        $(".patreon_gif .patreon_unlocked").removeClass('patreon_locked');
    }
    if(user != null && user.permissions.permission_video_overlay <= user.patreon_tier){
        $(".patreon_video_overlay").removeClass('patreon_locked');
        $(".patreon_video_overlay").addClass('patreon_unlocked');
    }else{
        $(".patreon_video_overlay .patreon_unlocked").removeClass('patreon_locked');
    }
    if(user != null && user.permissions.permission_reverse_censoring <= user.patreon_tier){
        $(".patreon_reverse_censoring").removeClass('patreon_locked');
        $(".patreon_reverse_censoring").addClass('patreon_unlocked');
    }else{
        $(".patreon_reverse_censoring .patreon_unlocked").removeClass('patreon_locked');
    }

    if(user != null && user.permissions.permission_shape_heart <= user.patreon_tier){
        $(".patreon_shape_heart").removeClass('patreon_locked');
        $(".patreon_shape_heart").addClass('patreon_unlocked');
        $(".patreon_shape_heart").removeAttr('disabled');
    }else{
        $(".patreon_shape_heart .patreon_unlocked").removeClass('patreon_locked');
    }

    if(user != null && user.permissions.permission_batch_converter <= user.patreon_tier){
        $(".patreon_batch_converter").removeClass('patreon_locked');
        $(".patreon_batch_converter").addClass('patreon_unlocked');
        $(".patreon_batch_converter").removeAttr('disabled');
    }else{
        $(".patreon_batch_converter .patreon_unlocked").removeClass('patreon_locked');
    }

    if(user != null && user.permissions.permission_batch_converter_folder <= user.patreon_tier){
        $(".patreon_batch_converter_folder").removeClass('patreon_locked');
        $(".patreon_batch_converter_folder").addClass('patreon_unlocked');
        $(".patreon_batch_converter_folder").removeAttr('disabled');
    }else{
        $(".patreon_batch_converter .patreon_unlocked").removeClass('patreon_locked');
    }

    if(user != null && user.permissions.permission_only_once_mode <= user.patreon_tier){
        $(".patreon_only_once_mode").removeClass('patreon_locked');
        $(".patreon_only_once_mode").addClass('patreon_unlocked');
        $(".patreon_only_once_mode").removeAttr('disabled');
    }

    if(user != null && user.permissions.permission_unlock_extension <= user.patreon_tier){
        $(".emergency-unlock-patreon").removeClass('patreon_locked');
        $(".emergency-unlock-patreon").addClass('patreon_unlocked');
        $(".emergency-unlock-patreon").removeAttr('disabled');
    }
    if(user != null && user.permissions.permission_unsubscribe_remote <= user.patreon_tier){
        $(".unsubscribe-remote-patreon").removeClass('patreon_locked');
        $(".unsubscribe-remote-patreon").addClass('patreon_unlocked');
        $(".unsubscribe-remote-patreon").removeAttr('disabled');
    }
    $("#account-required-info").hide();
}

function lockContent(){
    $("#profile_message").hide();
    let user_unlocked = $(".user_unlocked");
    user_unlocked.addClass('user_locked');
    user_unlocked.removeClass('user_unlocked')
    $("a[content='content-cloud']").hide();
    $("#remote-settings").hide();

    $(".patreon_gif").not(".patreon_nolock").addClass('patreon_locked');

    $(".patreon_video_overlay").not(".patreon_nolock").addClass('patreon_locked');
    $('#video-overlay-io').removeAttr('check');
    $('#video-overlay-button').removeAttr('check');

    $(".patreon_reverse_censoring").not(".patreon_nolock").addClass('patreon_locked');

    $(".patreon_shape_heart").not(".patreon_nolock").addClass('patreon_locked');
    $(".patreon_shape_heart").attr('disabled','disabled');

    $(".patreon_batch_converter").not(".patreon_nolock").addClass('patreon_locked');
    $(".patreon_batch_converter").attr('disabled','disabled');

    $(".patreon_batch_converter_folder").not(".patreon_nolock").addClass('patreon_locked');
    $(".patreon_batch_converter_folder").attr('disabled','disabled');

    $(".patreon_only_once_mode").not(".patreon_nolock").addClass('patreon_locked');
    $(".emergency-unlock-patreon").not(".patreon_nolock").addClass('patreon_locked');
    $(".unsubscribe-remote-patreon").not(".patreon_nolock").addClass('patreon_locked');
    $("#only_once_mode_customize").attr('disabled','disabled');

    $("#unlock-extension-patreon").attr('disabled','disabled');

    $(".patreon_unlocked").removeClass('patreon_unlocked');

    $("#account-required-info").show();
}