// Function to reset the upload section to its initial state
function resetUploadSection() {
    // Hide all tab content, steps, and box
    document.querySelectorAll('.tab-content').forEach(function(content) {
        content.style.display = 'none';
    });
    document.querySelectorAll('.steps').forEach(function(steps) {
        steps.style.display = 'none';
    });
    document.getElementById('boxContent').style.display = 'none';

    // Hide all preview boxes
    document.querySelectorAll('.preview-box, .short-preview-box, .post-preview-box, .poll-preview-box').forEach(function(preview) {
        preview.style.display = 'none';
    });

    // Remove active classes from tabs and steps
    document.querySelectorAll('.upload-tabs .tab').forEach(function(tab) {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.steps .step').forEach(function(step) {
        step.classList.remove('active');
    });

    // Show the initial message
    document.getElementById('initialMessage').style.display = 'block';
}

// Toggle content based on the tab clicked
// Toggle content based on the tab clicked
function showTabContent(tabName) {
    // Hide the initial message
    document.getElementById('initialMessage').style.display = 'none';

    // Hide all tab content
    document.querySelectorAll('.tab-content').forEach(function(content) {
        content.style.display = 'none';
    });

    // Hide all preview boxes
    document.querySelectorAll('.preview-box, .short-preview-box, .post-preview-box, .poll-preview-box').forEach(function(preview) {
        preview.style.display = 'none';
    });

    // Show the clicked tab content
    const selectedTabContent = document.getElementById(tabName + 'Content');
    if (selectedTabContent) {
        selectedTabContent.style.display = 'block';
    }

    // Show the steps for the selected tab
    const selectedSteps = selectedTabContent.querySelector('.steps');
    if (selectedSteps) {
        selectedSteps.style.display = 'flex';
    }

    // Set the initial default step for the selected tab and show corresponding preview box
    if (tabName === 'video') {
        showSectionContent('chooseMedia');
        const previewBox = document.getElementById('previewBox');
        if (previewBox) {
            previewBox.style.display = 'block';
        }
    } else if (tabName === 'short') {
        showSectionContent('chooseShort');
        const previewBoxShort = document.getElementById('previewBoxShort');
        if (previewBoxShort) {
            previewBoxShort.style.display = 'block';
        }
    } else if (tabName === 'post') {
        showSectionContent('choosePosts');
        const previewBoxPost = document.getElementById('previewBoxPost');
        if (previewBoxPost) {
            previewBoxPost.style.display = 'block';
        }
    } else if (tabName === 'poll') {
        showSectionContent('writepoll');
        const previewBoxPoll = document.getElementById('previewBoxPoll');
        if (previewBoxPoll) {
            previewBoxPoll.style.display = 'block';
        }
    }

    // Show the box content
    const boxContent = document.getElementById('boxContent');
    if (boxContent) {
        boxContent.style.display = 'block';
    }

    // Remove active class from all tabs
    document.querySelectorAll('.upload-tabs .tab').forEach(function(tab) {
        tab.classList.remove('active');
    });

    // Add active class to the clicked tab
    document.querySelector(`.upload-tabs .tab[onclick="showTabContent('${tabName}')"]`).classList.add('active');
}


// Function to manage content within the Poll tab
function showPollContent() {
    showTabContent('poll');
}

// Toggle content based on the section clicked within the Poll tab
function showPollSectionContent(sectionName) {
    // Hide all step content inside the box
    document.querySelectorAll('.box-content > div').forEach(function(content) {
        content.style.display = 'none';
    });

    // Display content based on the selected section
    const sectionContentId = sectionName + 'Content';
    const sectionContent = document.getElementById(sectionContentId);
    if (sectionContent) {
        sectionContent.style.display = 'block';
    }

    // Highlight the active step
    document.querySelectorAll('.steps .step').forEach(function(step) {
        step.classList.remove('active');
    });
    document.querySelector(`.steps .step[onclick="showSectionContent('${sectionName}')"]`).classList.add('active');
}

// Show upload section and prevent background scroll
document.querySelector('.add-icon-plus').addEventListener('click', function() {
    document.getElementById('uploadSection').style.display = 'block';
    document.body.classList.add('uploading'); /* Prevent background scroll */
});

// Hide upload section, reset content, and re-enable background scroll
document.querySelector('.back-icon').addEventListener('click', function() {
    document.getElementById('uploadSection').style.display = 'none';
    document.body.classList.remove('uploading'); /* Re-enable background scroll */
    resetUploadSection();
});

// Call resetUploadSection initially to ensure the initial view is displayed
resetUploadSection();
