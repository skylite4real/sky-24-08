// Function to handle video selection and display
function displayShort(input) {
    const file = input.files[0];
    if (file) {
        const videoHolder = document.getElementById('ShortBox');
        const videoCloseIcon = document.querySelector('.short-video-close-icon');

        // Create Video.js player
        const videoElement = document.createElement('video');
        videoElement.id = 'shortVideoPlayer';
        videoElement.className = 'video-js vjs-default-skin';
        videoElement.controls = true;
        videoElement.preload = 'auto';

        // Set the video source
        const source = document.createElement('source');
        source.src = URL.createObjectURL(file);
        source.type = file.type;
        videoElement.appendChild(source);

        // Remove any existing video and append the new one
        videoHolder.innerHTML = '';
        videoHolder.appendChild(videoElement);

        // Initialize Video.js on the created video element
        videojs(videoElement, {
            aspectRatio: '9:16',  // Set the aspect ratio to 9:16
            fluid: false,  // Prevent the player from resizing
            fill: true     // Make sure the video fills the container
        }, function() {
            console.log('Video.js player initialized');
        });

        // Show the close icon
        videoCloseIcon.style.display = 'block';
        videoHolder.appendChild(videoCloseIcon);

        // Store the file for preview use
        videoHolder.dataset.fileSrc = source.src;
        videoHolder.dataset.fileType = source.type;
    }
}

// Function to preview the selected video
function previewShortVideo() {
    const videoHolder = document.getElementById('ShortBox');
    const previewHolder = document.getElementById('shortPreview');
    const closePreviewButton = document.getElementById('closePreviewButtonShort');
    const videoCloseIcon = document.querySelector('.short-video-close-icon');
    const fileSrc = videoHolder.dataset.fileSrc;
    const fileType = videoHolder.dataset.fileType;

    if (fileSrc && fileType) {
        // Create a new video element for the preview
        const previewVideo = document.createElement('video');
        previewVideo.id = 'shortVideoPlayerPreview';
        previewVideo.className = 'video-js vjs-default-skin';
        previewVideo.controls = true;
        previewVideo.preload = 'auto';

        // Set the video source
        const previewSource = document.createElement('source');
        previewSource.src = fileSrc;
        previewSource.type = fileType;
        previewVideo.appendChild(previewSource);

        // Remove any existing preview video and append the new one
        previewHolder.innerHTML = '';
        previewHolder.appendChild(previewVideo);

        // Initialize Video.js on the created preview video element
        videojs(previewVideo, {
            aspectRatio: '9:16',  // Set the aspect ratio to 9:16
            fluid: false,  // Prevent the player from resizing
            fill: true     // Make sure the video fills the container
        }, function() {
            console.log('Preview Video.js player initialized');
        });

        // Show the preview box
        document.getElementById('previewBoxShort').style.display = 'block';
        closePreviewButton.style.display = 'block';
        videoCloseIcon.style.display = 'none';  // Hide the close icon when preview is open

        // Hide the preview button
        document.getElementById('shortvideoPreviewButton').style.display = 'none';
    } else {
        alert('Please select a video first.');
    }
}

// Function to close the video preview
// Function to close the video preview
function closePreviewShort() {
    // Clear the video preview content
    document.getElementById('shortPreview').innerHTML = '';
    
    // Hide the close preview button
    document.getElementById('closePreviewButtonShort').style.display = 'none';
    
    // Show the close icon again
    document.querySelector('.short-video-close-icon').style.display = 'block';

    // Show the preview button again
    document.getElementById('shortvideoPreviewButton').style.display = 'inline-block';
}


// Function to clear the selected video
function clearShortVideo() {
    const videoHolder = document.getElementById('ShortBox');
    const videoCloseIcon = document.querySelector('.short-video-close-icon');

    // Clear the video content and hide the close icon
    videoHolder.innerHTML = '';

    // Re-append the "Choose Short Video" button and input element
    videoHolder.innerHTML = `
        <input type="file" id="shortFile" accept="video/*" style="display: none;" onchange="displayShort(this)">
        <div class="choose-short-video-button" onclick="document.getElementById('shortFile').click();">
            <i class="fa-solid fa-clapperboard shorts-upload-icon"></i>
            <span class="shot-video-blue-text">Choose Short Video</span>
        </div>
    `;

    // Hide the close icon again
    videoCloseIcon.style.display = 'none';
    
    // Re-append the close icon in case user selects another video
    videoHolder.appendChild(videoCloseIcon);

    // Clear the stored data attributes
    delete videoHolder.dataset.fileSrc;
    delete videoHolder.dataset.fileType;
}



























// Function to proceed from the Choose Media section to Short Details within the .box-content
function goToshortDetailsContent() {
    // Hide all content within the .box-content
    document.querySelectorAll('.box-content > div').forEach(function(content) {
        content.style.display = 'none';
    });

    // Show the Short Details content within the .box-content
    document.getElementById('shortDetailsContent').style.display = 'block';

    // Highlight the Short Details step in the steps navigation
    document.querySelectorAll('.steps .step').forEach(function(step) {
        step.classList.remove('active');
    });
    document.querySelector(`.steps .step[onclick="showSectionContent('shortDetails')"]`).classList.add('active');
}

// Event listener for the Short Video Next button
document.getElementById('shortvideonextButton').addEventListener('click', goToshortDetailsContent);

// Ensure the corresponding content divs are correctly identified in your HTML
document.getElementById('shortDetailsContent').style.display = 'none'; // Initial state hidden
document.getElementById('chooseMediaContent').style.display = 'block'; // Assuming this is the initial state





// Function to proceed to the next section from Short Details to Advanced Details
function proceedToNextadvanced() {
    // Hide the Short Details section
    document.getElementById('shortDetailsContent').style.display = 'none';

    // Show the Advanced Details section
    document.getElementById('advanced-shortContent').style.display = 'block';

    // Highlight the Advanced step
    document.querySelectorAll('.steps .step').forEach(function(step) {
        step.classList.remove('active');
    });
    document.querySelector(`.steps .step[onclick="showSectionContent('advanced-short')"]`).classList.add('active');
}

// Function to go back from Short Details to Choose Short
function goBacktoshortvideo() {
    // Hide the Short Details section
    document.getElementById('shortDetailsContent').style.display = 'none';

    // Show the Choose Short section
    document.getElementById('chooseShortContent').style.display = 'block';

    // Highlight the Choose Short step
    document.querySelectorAll('.steps .step').forEach(function(step) {
        step.classList.remove('active');
    });
    document.querySelector(`.steps .step[onclick="showSectionContent('chooseShort')"]`).classList.add('active');
}





// Function to go back from Advanced Details to Short Details
function goBacktoshortdetails() {
    // Hide the Advanced Details section
    document.getElementById('advanced-shortContent').style.display = 'none';

    // Show the Short Details section
    document.getElementById('shortDetailsContent').style.display = 'block';

    // Highlight the Short Details step in the steps indicator
    document.querySelectorAll('.steps .step').forEach(function(step) {
        step.classList.remove('active');
    });
    document.querySelector(`.steps .step[onclick="showSectionContent('shortDetails')"]`).classList.add('active');
}

// Function to proceed to the Privacy section
function proceedToNextprivacy() {
    // Hide the Advanced Details section
    document.getElementById('advanced-shortContent').style.display = 'none';

    // Show the Privacy section
    document.getElementById('privacyVisibilityContent').style.display = 'block';

    // Highlight the Privacy step in the steps indicator
    document.querySelectorAll('.steps .step').forEach(function(step) {
        step.classList.remove('active');
    });
    document.querySelector(`.steps .step[onclick="showSectionContent('privacyVisibility')"]`).classList.add('active');
}





// Function to go back from Privacy to Advanced Details
function goBacktoadvanced() {
    // Hide the Privacy section
    document.getElementById('privacyVisibilityContent').style.display = 'none';

    // Show the Advanced Details section
    document.getElementById('advanced-shortContent').style.display = 'block';

    // Highlight the Advanced step
    document.querySelectorAll('.steps .step').forEach(function(step) {
        step.classList.remove('active');
    });
    document.querySelector(`.steps .step[onclick="showSectionContent('advanced-short')"]`).classList.add('active');
}

// Function to proceed from Privacy to Monetization
function proceedToNextMonetization() {
    // Hide the Privacy section
    document.getElementById('privacyVisibilityContent').style.display = 'none';

    // Show the Monetization section
    document.getElementById('monetizationshortContent').style.display = 'block';

    // Highlight the Monetization step
    document.querySelectorAll('.steps .step').forEach(function(step) {
        step.classList.remove('active');
    });
    document.querySelector(`.steps .step[onclick="showSectionContent('monetizationshort')"]`).classList.add('active');
}





// Function to go back from Monetization to Privacy
function goBacktoPrivacy() {
    // Hide the Monetization section
    document.getElementById('monetizationshortContent').style.display = 'none';

    // Show the Privacy section
    document.getElementById('privacyVisibilityContent').style.display = 'block';

    // Highlight the Privacy step
    document.querySelectorAll('.steps .step').forEach(function(step) {
        step.classList.remove('active');
    });
    document.querySelector(`.steps .step[onclick="showSectionContent('privacyVisibility')"]`).classList.add('active');
}





function toggleShortInfo() {
    // Get the short info box element
    const shortInfoBox = document.getElementById('shortInfobox');

    // Toggle the display property
    if (shortInfoBox.style.display === "none" || shortInfoBox.style.display === "") {
        shortInfoBox.style.display = "block";
    } else {
        shortInfoBox.style.display = "none";
    }
}





document.addEventListener("DOMContentLoaded", function() {
    // Get all info icons related to short video details
    const infoIcons = document.querySelectorAll('.fa-circle-info-short-video');

    infoIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Determine the corresponding info box using the icon's ID
            const infoBoxId = this.id.replace('Info', 'InfoBox');
            const infoBox = document.getElementById(infoBoxId);

            // Toggle the display of the corresponding info box
            if (infoBox.style.display === "none" || infoBox.style.display === "") {
                infoBox.style.display = "block";
            } else {
                infoBox.style.display = "none";
            }
        });
    });
});






document.addEventListener("DOMContentLoaded", function() {
    // Get all info icons
    const infoIcons = document.querySelectorAll('.fa-circle-info-advanced-details-short');

    infoIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Get the corresponding info box using the icon's parent container
            const infoBox = this.closest('.advanced-details-input-container-short').querySelector('.info-box-advanced-details-short');
            
            // Toggle the display of the info box
            if (infoBox.style.display === "none" || infoBox.style.display === "") {
                infoBox.style.display = "block";
            } else {
                infoBox.style.display = "none";
            }
        });
    });
});





















// Open Choose Short Terms Modal
function openChooseShortTermsModal() {
    document.getElementById('ChooseShortterms').style.display = 'block';
    document.body.classList.add('modal-open'); // Disable interactions with other sections
}

// Close Choose Short Terms Modal
document.getElementById('ChooseShortModalTermsCloseIcon').onclick = function() {
    document.getElementById('ChooseShortterms').style.display = 'none';
    document.body.classList.remove('modal-open'); // Re-enable interactions with other sections
};





document.addEventListener("DOMContentLoaded", function() {
    // Open Choose Short Content Warning Modal
    document.getElementById('openChooseShortConentWarningModal').onclick = function() {
        document.getElementById('ChooseShortConentWarnings').style.display = 'block';
        document.body.classList.add('choose-short-content-warnings-modal-open');
    }

    // Close Choose Short Content Warning Modal
    document.getElementById('ChooseShortConentWarningscloseicon').onclick = function() {
        document.getElementById('ChooseShortConentWarnings').style.display = 'none';
        document.body.classList.remove('choose-short-content-warnings-modal-open');
    };
});





// Open Age Restrictions Modal
document.getElementById('openAgeRestrictionsModalShort').onclick = function() {
    document.getElementById('AgeRestrictionsModalShort').style.display = 'block';
    document.body.classList.add('modal-open'); // Disable interactions with other sections
}

// Close Age Restrictions Modal
document.getElementById('AgeRestrictionsModalShortcloseicon').onclick = function() {
    document.getElementById('AgeRestrictionsModalShort').style.display = 'none';
    document.body.classList.remove('modal-open'); // Re-enable interactions with other sections
}





// Open License Type Modal
document.getElementById('openLicenseModalShort').onclick = function() {
    document.getElementById('openLicenseTypeModalShort').style.display = 'block';
    document.body.classList.add('modal-open'); // Disable interactions with other sections
}

// Close License Type Modal
document.getElementById('openLicenseTypeModalShortcloseicon').onclick = function() {
    document.getElementById('openLicenseTypeModalShort').style.display = 'none';
    document.body.classList.remove('modal-open'); // Re-enable interactions with other sections
}





// Open Monetization Modal
document.getElementById('shortOpenMonetizationModal').onclick = function() {
    document.querySelector('.short-Open-Monetization-Modal').style.display = 'block';
    document.body.classList.add('modal-open'); // Disable interactions with other sections
}

// Close Monetization Modal
document.getElementById('shortOpenMonetizationModalcloseicon').onclick = function() {
    document.querySelector('.short-Open-Monetization-Modal').style.display = 'none';
    document.body.classList.remove('modal-open'); // Re-enable interactions with other sections
}
