# PuryFirefox

# Installation and Usage

Visit the Firefox addon page (you directly navigate to that page via the url "about:addons").
Click on the gear icon and select "Install Add-on From File...", then select the PuryFirefox xpi file. 

# Changelog
All notable changes to this project will be documented in this file.

0.8.0.8

    - Added PayPal as a payment processor option when choosing to support us from the extension.
    - Fixed censoring an image through the context menu not working on local files.

0.8.0.7

    - Added Linux support for the Video Processor app.

0.8.0.6

    - Added the option to copy and paste entire whitelists and blacklists as text.
    - Improved the handling of partial video requests, which solved issues with videos sometimes not playing in certain sites.
    - Fixed Mega download pages occasionally failing loading due to a possible Firefox bug triggered by our extension listening to its request responses, requests from certain Mega URLs are now ignored to workaround this issue.
    - Fixed Hand Exposed and Hand Covered in the Mixed configuration being bound to each other's content type.
    - Added french language support.

0.8.0.5

    - Added settings for configuring the number of threads and the inactivity timeout of the video file processor.
    - Improved the handling partial video requests, which solved issues with videos sometimes not playing in certain sites.
    - Added a visible scrollbar to the tab groups in the extension's page.
    - Linked our new official social media pages, Bluesky and X.
    - Fixed the lock time added by timer+ not being scaled according to the minimum size set for it.
    - Fixed failing to intercept Bluesky video requests, this time the site specific rule for it was added properly.
    - Fixed video processing not being togglable while locked even if the video optional lock wasn't on.
    - Fixed various translations.

0.8.0.4

    - The way pages requesting the same video multiple times at once is handled has been improved, notably this makes the Video Processor app now work properly on some websites.
    - Toggling Prefer Edited Corrections now also clears the cache.
    - Improved the error logging around the Video Processor app's startup.
    - Fixed various setting related false positive errors related being raised by the Video Processor app.
    - Fixed not being able to save the video configuration in settings.
    - Fixed toggling the extension on or off in the popup not updating the extension toggle in the extension's page.

0.8.0.3

    - Stickers in sticker collections are now checked on load for being corrupted and are repaired when possible.
    - The Video Processor app now terminates itself after a certain period of time if the extension never attempts to connect to it, which can for example happen if video processing is disabled while awaiting to connect to the Video Processor server.
    - Fixed some settings not being properly repaired to work on the latest version.
    - Fixed the Video Processor app failing to process mpegts video segments with no audio streams.
    - Fixed the Video Processor app crashing when a process was interrupted at specific points in the processing.
    - Fixed failing to intercept BlueSky video requests, a site specific rule has been added for this.
    - Fixed batch processing failing to identify images on the files uploaded.

0.8.0.2

    - Added a new video processing method, the File Processor, which requires the installation of the new Video Processor app of PuryFi.
    - Added an option to configure the maximum number of images that get processed concurrently.

    - Borders will now stack for Pixel censors with Scale With Detections on.
    - The full image sticker on Reverse Mode Sticker is now drawn with a contain fit, rather than with a cover fit.
    - Fixed some images sometimes failing to automatically refresh when requested.
    - Fixed modifying your lock configuration while in a remote causing the lock configuration if any of said remote to reapply for a second time.
    - Fixed requesting to censor a local file through its context menu not always working.
    - Fixed the boxes on Reverse Mode Box having the outer half of their borders cropped out.
    - Fixed various UI quirks.

0.7.11.2

    - Added an experimental unfreeze button in the help menu.
    - Fixed the editor not being able to save detections.
    - Fixed certain Mixed configurations with Captions enabled not working.
    - Fixed OOM animations sometimes leaking memory when processing blob images.

0.7.11.1

    - Gaussian Blur now applies no upper limit to the strength of the blur before censoring, previously v0.7.11.0 had set this limit to around 90.

    - Fixed Gaussian Blur and Diffusion Blur not working on mobile.
    - Fixed the Security page not updating immediately after the lock settings became valid or invalid from input changes.
    - Fixed not being able to use control actions in many inputs in options.
    - Fixed the toggle for enabling/disabling the extension in options being clickable, although useless, while locked.
    - Fixed ongoing video overlays breaking when certain configuration changes occurred, particularly ones to Mixed or to Caption.
    - Fixed some tooltips not displaying.
    - Fixed certain configurations of Mixed mode with Random entries not working.

0.7.11.0

    - Added the Rotation option to Cluster, with which you can allow the resulting detections to be rotated as needed to efficiently cover the joined detections.
    - Added a new Blur type: Diffusion Blur.
    - Added a new OOM mode: Custom, which allows you to select an censor mode and preset from the Censor page to use for the blocking of the image.
    - Greatly optimized Gaussian Blur.
    - Blob Images are now scanned for, and processed, in a far more efficient and reliable manner.
    - OOM animations and automatic refreshes now also work on blob and data images.
    - OOM animations and automatic refreshes now work considerably more reliably across more websites in general.
    - Improved various of the algorithms involved in choosing caption entries to use in a given image.
    - All round performance improvements.
    - Various UI and UX improvements, particularly to tooltips and to Reverse Mode.
    - Fixed saved settings from older versions sometimes not being repaired for the newer version upon loading them.
    - Fixed the value for the Distance option on the Borderless mode for OOM not being correctly loaded back.

0.7.10.4

    - Improved the visibility of the FPS counter on video overlays.
    - Added a note on the video section on the options page mentioning that video overlays don't work on mobile.
    - Clear Data, previously Restore Defaults, now also clears the local storage, clears the processing queue, and logs you out.
    - Added the Export Data and Import Data options to the help page, which allow you to copy and share all of your extension data.
    - Added the Create Report option to the help page, which can be used to quickly and easily share extension, browser, and system information with developers.
    - When censoring just the thumbnails of GIFs through the batch converter, the resulting file is now saved with a .png extension instead of a .gif one

    - Fixed halftone pixel not working on video overlays.
    - Fixed censoring not working when reverse mode was on yet the user didn't have access to the feature.
    - Fixed video overlays flickering when encountering corrupted frames.
    - Fixed settings from old versions losing what presets were selected upon repairing the settings.
    - Fixed the batch converter getting stuck at censoring the first image for some users.

0.7.10.3

    - Greatly improved the memory efficiency and speed of saving sticker collections.
    - Caption collection files are now validated on import.
    - Users are now notified of certain issues the extension cannot resolve on its own, 
	  such as issues caused by incompatibilities with browser settings, or issues caused by Firefox bugs.

Bug Fixes:

    - Fixed a minor visual bug present in censors with both border and feathering.

0.7.10.2

New Content:

    - You can now export and import caption collections.
    - You can now select ranges of caption entries or tags by pressing shift + click.
    - Various Caption UI improvements.

Bug Fixes:

    - Fixed UI not immediately updating user info after logging out.
    - Fixed some fonts not being properly applied on Word Wall, Caption, and Box.

0.7.10.1

New Content:

    - Added portuguese language support

Bug Fixes:

    - You can now press enter after inputting the value for a new caption to add another caption entry immediately.
    - Fixed the options page not working on private windows.
    - Fixed the toggle for hand not working on stickers.
    - Fixed OOM causing an error when box tease was selected.
    - Fixed super random mode for Random not working.
    - Fixed Caption causing an error when used on heart shapes.
    - Fixed shapes set to heart not being restored when loading the options page.
    - Optimized the lock timer logs to take up significantly less memory over time.
    - Fixed White-/Black-List not saving on settings.

0.7.10.0

New Content:

    - New Caption Mode
    - Internationalization: Added support for German, Spanish, Korean and Chinese languages.
    - You can now individually assign cluster, word wall, and caption presets to each censor mode preset.
    - Added the Max. Distance option to Cluster, with which you can now join detections within a certain distance of the other, and not just overlapping detections.
    - Added the Color Mode option to Halftone Pixel, with which you can enable the new CMYK color mode.
    - Greatly optimized Word Wall, it now being 6-30 times faster depending on values like the font or size.
    - Pixel scale with detections changes*
    - While locked, you can now see the times set for timer+ as well as a log of all its recent activations from within the security page.
    - Lock configurations can now also loaded from stored settings, note that the extension will still not be locked in this case even if the saved lock configuration was set to enabled.
    - You can now whitelist/unwhitelist and blacklist/unblacklist websites from within the context menu on the browser tabs.
    - Repainted the whitelist & blacklist page.
    - You can now create plain text entries for the whitelist and blacklist, simply toggle between regex/text on the entry.
    - You can now remove entries from the whitelist while locked.
    - Removed the lower case restriction on sticker names*.
    - The 255 MB limit on sticker collections is now a limit per collection, not for all combined collections.
    - You can now drag and drop sticker collection files from your file system and onto the sticker collections area to quickly import them.
    - You can now drag and drop images from your file system and onto the stickers area to create new stickers.
    - New and better UI confirmations and alerts.
    - Changes done interacting with the popup are now reflected on the options page immediately.
    - All censor mode presets now get an autogenerated name when created.

Bug Fixes:

    - Fixed bug which had the angles of Word Wall be inconsistent on videos and GIFs.
    - Fixed bug which had GIFs exported from a video not get censored with a consistency between frames (Sticker drafted stickers every frame, Random Mode randomized the censor mode every frame, etc.).
    - Fixed bug which could allow users to end with invalid configuration states by importing configurations that pointed to other configurations yet not importing those other configurations, an example would be importing just a Mixed configuration which could be pointing to a now non-existent censor preset.
    - Fixed bug which had the extension not work on some forks of Firefox, such as Waterfox.
    - Fixed bug which could cause exported settings to be saved with malformed version numbers if the destination folder already contained a file by that name
    - Fixed bug which sometimes caused a popup to not show up which was meant to inform the user that they were already up to date with the settings for their remote subscription when manually syncing.
    - Fixed bug which caused images with edited detections to prefer the cached result from AI model over the said detections edited by the user even when prefer edited detections was enabled.

Known Issues:

    - Old mixed censor settings that made use of both of reverse mode and word wall might not work as expected on this version.
    - Captions don't currently remain consistent on videos or GIFs.
    - Captions don't currently work on glitch's chromatic aberration censors.


0.7.9.3

Bug Fixes:

    - Fixed bug which restarted the lock timer of remote subscribers
    - Remote subscribers will no longer be re-locked if they unlocked themselves by inputting a password or unlock token, and then the same settings from the remote were re-fetched
    - The determined width for line shapes is now more accurate.
    - The Min. File Size and Max. File Size inputs for file types now also allow decimal inputs.
    - Added a scrollbar to the user management panel in remote settings

0.7.9.2

Bug Fixes:

    - Fix bug which had OOM animations not always work in some sites that pre-loaded their images
    - Fix exploit in which you could log out of your account, or purposefully lose your patreon benefits, 
      in order to disable features like OOM or reverse mode even while locked, now the features will remain enabled,
      however if the logged in user doesn't have access to them, 
      all images that use the feature will instead be blocked until said features are turned off or the logged in user has access to the features
    - Fix bug which froze the options page when creating certain lock configurations
    - Fix bug which froze the options page when logging in
    - Fix bug which had automatic video overlay ignore the whitelist/blacklist

0.7.9.1

Bug Fixes:

    - Added a tooltip to the disabled lock toggle on the saving configuration section explaining why the lock isn't valid and thus why the toggle is disabled
    - Fixed bug which froze the extension when certain old settings where loaded
    - Fixed bug which had some old box mode configurations not be properly updated
    - Fixed bug which had the lock configuration be reset while under certain circumstances while not locked
    - Fixed bug which had old settings from remote controls not be always be updated
    - Fixed bug which allowed reverse mode to still be toggled from the popup while locked
    - Fixed bug which had some AVIF images not properly load

0.7.9.0

    - Added GIF-Export feature to the Video-Overlay
    - Added Overdrive option to the Video-Overlay
    - Implemented a Censor Editor
    - Added an editor option to the context menu
    - Added the ability to save and import images with settings embedded on their metadata, allowing these images to be shared as setting files
    - Added the ability to create settings that enable and/or lock the extension without having to enable or lock your own extension to create them
    - Added the grid width and grid color settings to pixel mode
    - Added a new pixel type: halftone
    - Added the style setting to word wall

Bug Fixes:

    - Restored some default values for Censor Types
    - Improved the behavior of the video overlay on streams
    - Video options have been merged into File Types
    - Now when any device logs into a PuryFi account that device will now be automatically subscribed to any remote control bound to that account. 
      Note that because you will no longer be able to unsubscribe from locked-subscription remote controls by logging out and back, staff at our Discord server will now be accepting DMs from users requesting to be unsubscribed. 
      Additionally, being a member of our 4th Patreon tier will now also allow you to unsubscribe from locked-subscription remotes on top of allowing you to emergency unlock the extension.
    - Locking the extension now also locks the "Restore Defaults" button on the help page
    - Reworked and simplified the quick settings and settings to save sections of the settings page
    - Added the random and mixed censor options to context menus
    - Lifted the lower-case restriction on quick setting names
    - Two new themes were added: Retro Wave & Amoled, and the Pink Doll theme was overhauled

0.7.8.3

Bug Fixes:

    - Fixed freezing that occurred when oom blocked a blob image
    - Fixed some bugs that sometimes caused line shapes to not perfectly cover the detected body parts

0.7.8.2

Bug Fixes:

    - Fixed a bug causing timer+ mode to not work

0.7.8.1

New Content:

    - Added two more themes
    - Improved color deduction
    - Added sign sticker pack

Bug Fixes:

    - Fixed a critical bug preventing stickers from being editable

0.7.8.0

New Content:

    - Added the possibility to define a custom color scheme in advanced.
    - Added five different default color schemes.
    - Added border settings to all shaped censors.
    - Added rounding setting to all square shaped censors.
    - Added a line shape.
    - Added a type setting to bar censors ([Paint] Paint the effect are with the given color. [Erase] Erase the effect area at the given opacity.).
    - Added an accurate sampling setting to pixel censors (Whether to set the color of each pixel to the average color of all pixels it covers instead of to the color of just the centermost pixel it covers).
    - Added various optimization settings to GIFs which should reduce both processing times, as well as the likelihood of content mistakenly going uncensored.
    - Added a grayscale setting to the strong blur mode of OOM.
    - Added a password randomizer button to security.
    - Added options for customizing the UI's color scheme.
    - Updated statistic and help page to new UI style.
    - Presets can now be copied and pasted across censor modes, where non-shared fields are simply ignored
    - Base 64 images are now preemptively blurred when the web page loads, before any image gets to render.
    - The word wall is now drawn under the borders of box censors.
    - In pixel censors, the area covered by a hexagonal or glitched pixel is now the same one a mosaic pixel would cover at the same effect strength.
    - Pixels in pixel censors are now aligned to the image rather than to the detection. This means that same size pixels across detections will now line up.
    - The diameter of circle shapes is now determined by the average of the width and height of the detection, rather than by the smallest dimension of the two.

Bug Fixes:

    - Fixed bug which had censor preset tabs stop working after deleting one under certain conditions.
    - Fixed bug which had very high values of feathering not draw perfectly smooth edges
    - Fixed bug which had file output types be ignored for some censors modes in base 64 and local files.
    - Fixed bug which had min/max size and dimensions be ignored for some censors modes in base 64 and local files.
    - Fixed bug in triangle censors which allowed the vertex count to be possibly greater than the pixel count of the effect area, which would then lead to the extension freezing.
    - Fixed bug which had the min/max height inputs in file types not trigger a save when modified.
    - Fixed bug which had pasting a preset config not trigger a save.
    - Bar censors no longer stack on top of other bar censors on the same layer or on top of the reverse censor, now they instead clip, like they once used to.
    - Blob images are now also picked up and censored by the base 64 scanner.
    - Base 64 images added or modified after the web page has finished loading now also get picked up for censoring.
    - Feathering no longer scales with the size of the effect area, now the feathering instead scales with the size of the image and the size of the effect area scales with the feathering.
    - Fixed a bug in batch converter when converting images while oom is enabled

0.7.7.0

New Content:

    - Improved and repainted the (almost) entire UI
    - Presets: You can now create up to 4 preset-settings for your censor-mode settings
    - Mixed mode now allows stacking up to three different censors on the same body part
    - Mixed mode now allows applying a different censor configuration per body part (and also per layer)
    - Added resolution aware setting to blur censors
    - Added channel colors setting to pixel (limit the total number of colors in the resulting pixels)
    - Added display setting to box censors (toggle the visibility of the name and score labels)
    - The border width of box censors and the stroke width of triangle censors are now proportional to the image's resolution
    - Optimised triangle censors

Bug Fixes:

    - Added tooltips to many settings which didn't have them
    - Fixed mixed mode bug which caused clustering to occur before scaling
    - Fixed random mode bug which caused various setting values to unnecessarily round to the nearest integer
    - Fixed bug which caused feathering to not lead to a smooth blend for some censor types
    - Fixed bug which caused clustering to be skipped if censoring a local file for some censor types
    - Fixed bug which caused blacklist and whitelist to not be saved when cleared of all entries
    - Fixed bug which caused imported settings to sometimes be loaded before they finished being updated
    - Fixed bug which had the face box be drawn on top of the border on OOM when allow faces was on
    - Fixed bug which had OOM animation filters sometimes not be removed when the image was refreshed
    - Fixed bug which caused webpages added to the blacklist while locked to not take effect until the extension was refreshed
    - Multiple panels no longer does one less panel for detections under an arbitrary size
    - Mosaic pixel now samples color at the center of the pixel instead of at the upper left corner
    - Super Random Mode adjustments
    - Fixed some AVIF identification errors

0.7.6.1

New Content:

    - Extension API: Paint requests now also return the AI info
    - Sticker reverse mode
    - Added angle setting to word wall
    - Added random mode to mixed mode
    - Added detection size aware and resolution aware 
      (replacing percentage pixel size mode) to pixel censors

Bug Fixes:

    - Fixed a bug causing Sticker-Mode not working on video overlay
    - Fixed a bug causing video overlay to not spawn via context menu
    - Fixed bug which doubled the border width of sections where box censors overlapped
    - The label text of box censors is now accurately centered
    - The label text of box censors now shrinks to fit
    - Added scale settings to box censors
    - Fixed bug which made splatter reverse mode ignore the color scheme
    - Fixed bug which made splatter reverse mode sometimes color sample itself when supposed to color sample the original image
    - Stickers are now masked accurately instead of masking a rectangle around it in mixed mode
    - Enabled body parts with normal censors are now left uncensored by mixed reverse mode.
    - Semi-transparent colors in many censors now blend in with the reverse censor instead of with the original image
    - Fixed bug which made some settings not load when their values where 0
    - Fixed bug which made sticker chance and scale clamp to the wrong value range.

0.7.6.0

New Content:
    
    - Mixed Mode
    - Random Mode

Bug Fixes:

    - Fixed a bug causing in quick configs beeing displayed twice
    - Fixed Splatter default color mode
    - Fixed a bug causing box mode to not fill boxes
    - Enabled clustering boxes to work on videos
    - Enabled sticker mode to work on Base64-Images
    - Fixed some bugs in reverse mode config

0.7.5.3

Bug Fixes:

    - Fixed Transparent Word Wall mode & Color mode on reverse

0.7.5.2

New Content:

    - Added Color Mode and Font options to Word Wall

Bug Fixes:

    - Changed all color selection ui-elements
    - Improved video handling within shadowroot (still not perfect)
    - Changed the fps-meter algorithm
    - Fixed a bug causing remote locks to end when options are loaded
    - Fixed a bug with video overlay freezing when started from triangle or glitch mode

0.7.5.1

New Content:

    - Added a remote subscription system to auto-load settings of provided by other users.
    - Added a Patreon Cache System, which will remind you 
      to rebind your patreon account to pury.fi and prolong its duration, in case it has been expired.
    - Added extra options to box mode
    - Increased max scale limit from 5 to 10
    - Cloud settings do now list their number of downloads
    - Added quick config as an optional lockable settings
    - Sticker cache is now only rebuilt when sticker options have changed
    - Lock password is now internally saved as a hash

Bug Fixes:

    - Fixed a bug showing a profile even if login has failed
    - Fixed a bug not showing version suffix
    - Fixed a bug allowing to remove lock state by loading default quick config


0.7.5.0

New Content:

    - Exportable & Importable settings added
    - Cloud Storage System für settings integrated

0.7.4.11

Bug Fixes:

    - Various bug fixes

0.7.4.10

Bug Fixes:

    - Various bug fixes

0.7.4.9

Bug Fixes:

    - Fixed various bugs within local file censoring.

0.7.4.8

Bug Fixes:

    - Fixed a bug preventing Pixel sub-modes working in reverse mode.

0.7.4.7

Bug Fixes:

    - Various bug fixes

0.7.4.6

New Content:

    Word Wall Mode
    - Stamps out words from censored areas
    - Can be combined with every other mode

    New Giltch Mode: Multiple Panels
    - Can be found as a sub-mode in Glitch Mode
    - Spreads various rectangles around censored areas

    - Added a new trigger option to reverse mode

Bug Fixes:

    - Improved the general support for OOM Timermode and its animations.
    - The extension should now place itself again into the toolbar on installation


0.7.4.5

New Content:

    Timer Mode for Only Once Mode
    - Define a (min- and max-) duration after which the image is blocked
    - Autorefresh image option for timer mode
    - Cooldown animations options for timer mode
    Added new Grayscale options to:
    - Pixel Mode
    - Blur Mode
    Added minor trigger options to Reverse Mode

Bug Fixes:

    Improved YouTube support for the video overlay
    Added info boxes to some options
    Moved OOM and Security to "Extra" category
    Improved AVIF identification

0.7.4.4

New Content:

    Every non default OOM-Mode offers now customisation options!
    See Trough: transparency
    Borderless: rounded borders + border distance
    Thumbnail: optional additional blur
    Grid: grid strength and custom color
    Blur: blur strength
    Box Tease: allow faces

Bug Fixes:

    The video menu can now be optionally locked
    Blacklist can now be used to add but not to remove entries while locked
    Fixed a bug causing color to be inverted with reverse sobel mode

0.7.4.2

    Added Box Tease Mode to OOM
    Added a drop shadow to oom text

Bug Fixes:

    Fixed undefined sticker name export
    Fixed sticker import not working
    Sticker export files now end with ".pstp" (puryfi sticker pack)
    Fixed settings being able to be saved
    Fixed a bug not updating the popup when a lock timer reached zero

0.7.4.1

Bug Fixes:

    Fixed a bug causing timer + to unlock the extension immediatly
    Fixed a bug causing quick setting names to stop working when using upper case letters
    Increased OOM container size to 5000

0.7.3.3

Bug Fixes:

    Local GIF censoring working again
    Timer Plus values are now correctly being assigned
    Timer is now updated when values are changed without having to refresh the options page
    Security page is now being locked on all open option page tabs
    Lock settings are now loaded earlier to reduce slow JS impact
    Video Overlay is now respecting white and black-list settings

0.7.3.2

Bug Fixes:

    Context Menu is now also locked when using the lock while being logged in
    Number input can now be 0 again!

0.7.3.1

New Features:

    Lock mode
        Reverse mode is now (b)locked when locked
        Adjusted Box Mode when locked
        Added the timer display to the popup
        Added the option to also lock the Censor Mode
    Timer +
        Timer+ lets you add a duration reward / penalty when certain labels are loaded
        Added a function to increase the duration when already locked
    Quick Settings
        Added quick load function to the popup!
        Fixed logout on loading default settings

0.7.2.1

New Features:

    Splatter presets
    Extension Icon shows if the extension is off / on.

Bug Fixes:

    Fixed several bugs in the video overlay
    Fixed a bug causing box merging to crash on splatter mode
    Added splatter mode to the supported Video Overlay modes

0.7.2

New Features:

    New censoring mode: Splatter
    Statistics
    Added alternative Icons to 'Advanced'

Bug Fixes:

    Fixed another bug where "normal" mode did not show any video output.

0.7.1

New Features:

    New censoring mode: Sobel
    Prescaling

Bug Fixes:

    Fixed the memory leak Issue for the batch converter and videos.
    Fixed a bug when auto-loading the video overlay, where "normal" mode did not show any video output.
    Several adjustments to the batch converter making it faster.
    Added more internal data to the Help-Page.

0.7.0.1

New Features:

    FPS display for the video overlay

Bug Fixes:

    Fixed a problem causing the batch converter and local file feature to convert all image types to PNG even though they are labelled as JPG.
    This also resulted in a much bigger file sizes.
    Fixed a bug resulting in distorted videos within the video overlay.
    Fixed a bug which prevented some JPG images from being processed Various small improvements on the overlay UI elements.

0.7.0

New Features:

    Polished Video Overlay

0.6.8.2

Bug Fixes:

    Fixed local files not working with most modes
    Fixed video / local / base64 encoded images being censored when the extension was set to OFF
    White & Blacklist are now more / less strict and also consider the origin URL of images
    The context menu now also works on local files

0.6.8.1

New Features:

    Sticker Mode
    Base64 encoded image support
    Reset configuration option

0.6.7

New Features:

    Batch Converter

The Batch Converter allows you to select multiple files or entire folder structures at once and send them through the censoring process. The censored images are then returned in a zip file.

Bug Fixes & other:

    Fixed a bug which prevented the video overlay from working.
    Added a toggle button which inverts your label settings for better switching between normal and reverse mode.
    Improved the general memory usage.
    Changing the color for black box mode now works within Reverse Censor Mode.

0.6.6(.1)
New Features:

    Clustering

Clustering is an optional feature which you can activate to merge overlapping boxes into one bigger box. This way clustering can increase the perceived quality for some modes, such as black boxes. Clustering allows you to either merge all overlapping boxes or you can limit it to boxes of the same type.
Bug Fixes:

    Fixed a bug saving the image with the current censoring settings, even when the censor mode was changed via the context menu.
    Added Triangulation mode to the context menu
    Fixed a bug of v0.6.6 which prevents censor mode changes from being applied

0.6.5

New Features:

     You can now define maximum and minimum file size for each image type.
    You can now define maximum and minimum dimensions for each image type.
    You can now define a maximal frame count for GIFs.
    GIF Mode also offers now a fallback option to thumbnail mode if a GIF exceeds a given limit.

These changes should help processing extraordinary large files which can cause freezes or crashes, especially on slow computer systems, by filtering them out.

    You can now choose the output image type for each image type.
    (Before everything was converted to PNG)

Bug Fixes:

    Fixed a bug not displaying small images at all
    Fixed a bug displaying NaN in the memory cache
    Fixed Hexagon modes drawing behavior, which ended rendering before reaching the end of the bounding box.

0.6.4

New Features:

    New triangulation mode
    Works with gif censoring and reverse mode but does not work on videos or on local files as off now.

Improvements:

    PuryFi for Firefox can now also censor files which require login credentials to be accessed
    Improved the video overlay positioning
    Very small general performance improvements
    Now consumes ~ 50% less network traffic

Bug Fixes:

    Fixed a bug causing the video overlay to be blocked by some pages

0.6.3
New Features:

    Shapes
    You can now select shapes within Box, Blur and Pixelation mode:

        Rectangle
        Circle
        Ellipse
        Heart (PuryFi Supporter)

    Reverse Censoring (Censored Patron)
    Censors everything except the selected labels.

    All new features also work with GIF censoring and on the video overlay.

Improvements:

    Performance improvements for the Glitch mode

0.6.2

New Features:

    White and Blacklist mode
    You can white or blacklist web pages now in the options menu

Improvements:

    Fixed a bug which prevented images < 50px from being loaded
    Fixed a bug on web pages with unknown mime types

0.6.1

New Features:

    New censor mode: Glitch
    Glitches areas of the image by shifting the color channels and applying other effects.
    Note: Glitch mode has currently a bad performance and takes a bit longer than the other modes much depending on the image size.
    (Using it on videos is not recommended)
    More custom control options will be available for this mode in future versions.

Improvements:

    The experimental video censor overlay has now a much better performance
    Note: As the video functionality gets closer to reaching the quality i am aiming for i will slowly move it out of the experimental features into the Patreon features (until it is replaced by real video censoring). With this update the feature requires you to have an account and login in the extension but it can still be used freely.

        Black Bar: x10 times faster on videos and a bit faster on images
        Pixelation: x100 times faster on videos and faster on images
        Hexagons and Hexaglitch: x50 times faster on videos and faster on image
    Censor settings can now be changed and applied while the video is playing
    The extension handles videos now much more efficient, videos do no longer have to fully load to be displayed!
    Removed the bug which caused only JPG to be processed for the localfile feature

0.6.0

New Features:

    You can now open local files with Firefox and they get censored
        Works with all image types (except GIF)
        Known Bug: The context menu is not working on local files

Improvements:

    Experimental video censor mode now considers options
    Pixelation has a bad performance on videos, we will try to improve the algorithm in one of the next versions.

0.5.9

New Features:

    Added Hexagonal censoring mode
    You can find this mode as a sub-mode of Pixelation, make sure you choose a higher pixelsize ( > ~10px) when switching.

Bug Fixes:

    Fixed the context menu options working only once per image
    Fixed a bug which prevented GIF thumbnails from working

0.5.8

New Features:

    Reworked the blurring algorithm
    Added options for blur censor type
    Added a cache overview under Help
    Added the option to disable and / or clear the internal cache system
    Added experimental video overlay
    Added memory safe mode for GIF encoding

Bug Fixes:

    Fixed a bug which always displayed the extension as ON even if it was OFF


## [Unreleased]

## [0.4.2] - 10.07.2021
- Removed some bugs and warnings

## [0.4.1] - 05.07.2021
- Added 2 new censor modes 
	- Normal (No censoring)
	- Boxes (Showing the identified label)
	
## [0.4] - 01.07.2021
- New AI which does not rely on a client - server approach
- Code for AI interaction completely rewritten
- Removed API key authentication

## [0.3] - 05.02.2021
- Updated censoring code.
    - Improved pixelation scaling
    - Improved blur scaling
    - Improved blur performance on large images with small censor areas.
- Included API key authentication

## [0.1] - 24.01.2021
- Options page
- Menu Pop-Up box
- Censor Type options