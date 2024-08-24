function displayPost(input) {
    const postBox = document.getElementById('postBox');
    const swiperWrapper = document.getElementById('swiperWrapper');
    const swiperContainer = document.getElementById('mediaSwiper');

    const files = input.files;
    const maxFiles = 15; // Increased from 10 to 15
    const existingSlides = swiperWrapper.children.length;
    const displayFiles = Array.from(files).slice(0, maxFiles - existingSlides);

    if (displayFiles.length > 0) {
        postBox.classList.add('filled');
        swiperContainer.style.display = 'block';
        function displayPost(input) {
            const postBox = document.getElementById('postBox');
            const swiperWrapper = document.getElementById('swiperWrapper');
            const swiperContainer = document.getElementById('mediaSwiper');
        
            const files = input.files;
            const maxFiles = 15; // Increased from 10 to 15
            const existingSlides = swiperWrapper.children.length;
            const displayFiles = Array.from(files).slice(0, maxFiles - existingSlides);
        
            if (displayFiles.length > 0) {
                postBox.classList.add('filled');
                swiperContainer.style.display = 'block';
        
                displayFiles.forEach((file) => {
                    const slide = document.createElement('div');
                    slide.classList.add('swiper-slide');
        
                    const mediaWrapper = document.createElement('div');
                    mediaWrapper.classList.add('media-wrapper');
                    mediaWrapper.style.position = 'relative';
        
                    const closeIcon = document.createElement('i');
                    closeIcon.classList.add('fa-solid', 'fa-x', 'post-close-icon');
                    closeIcon.style.display = 'block';
                    closeIcon.onclick = function() {
                        swiperWrapper.removeChild(slide);
        
                        if (swiperWrapper.children.length === 0) {
                            swiperContainer.style.display = 'none';
                            postBox.classList.remove('filled');
                            document.querySelectorAll('.post-close-icon').forEach(icon => {
                                icon.style.display = 'none';
                            });
                        } else {
                            swiperContainer.swiper.update(); // Update the swiper
                        }
                    };
        
                    if (file.type.startsWith('image/')) {
                        const img = document.createElement('img');
                        img.src = URL.createObjectURL(file);
                        img.style.maxWidth = '100%';
                        img.style.maxHeight = '100%';
                        img.style.objectFit = 'contain';
                        mediaWrapper.appendChild(img);
                    } else if (file.type.startsWith('video/')) {
                        const video = document.createElement('video');
                        video.src = URL.createObjectURL(file);
                        video.controls = true;
                        video.style.maxWidth = '100%';
                        video.style.maxHeight = '100%';
                        video.style.objectFit = 'contain';
                        mediaWrapper.appendChild(video);
                    }
        
                    mediaWrapper.appendChild(closeIcon);
                    slide.appendChild(mediaWrapper);
                    swiperWrapper.appendChild(slide);
                });
        
                if (swiperContainer.swiper) {
                    swiperContainer.swiper.update();
                } else {
                    new Swiper('.swiper-container', {
                        loop: false,
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                            dynamicBullets: true,
                            dynamicMainBullets: 3,
                        },
                        touchRatio: 0,
                        simulateTouch: false,
                        grabCursor: false,
                        allowTouchMove: false,
                    });
                }
            }
        }
        
        function adjustPostboxHeight(media) {
            const postBox = document.getElementById('postBox');
            const aspectRatio = media.videoWidth / media.videoHeight || media.naturalWidth / media.naturalHeight;
        
            if (aspectRatio > 1) {
                postBox.style.paddingTop = (100 / aspectRatio) + '%';
            } else {
                postBox.style.paddingTop = (aspectRatio * 100) + '%';
            }
        }
        
        document.querySelectorAll('.swiper-slide img, .swiper-slide video').forEach(media => {
            media.onload = () => adjustPostboxHeight(media);
            media.onloadedmetadata = () => adjustPostboxHeight(media);
        });
        
        // Gesture Swiping Method-2
        function handleStart(event, state) {
            if (state.swipeLocked) return;
            state.isSwiping = true;
            state.startX = event.clientX || event.touches[0].clientX;
        }
        
        function handleMove(event, state, swipeSensitivity, mediaArray, displayCurrentMedia) {
            if (!state.isSwiping || state.swipeLocked) return;
        
            const currentX = event.clientX || event.touches[0].clientX;
            const diffX = state.startX - currentX;
        
            if (Math.abs(diffX) >= swipeSensitivity) {
                state.swipeLocked = true;
        
                // Move one slide at a time
                if (diffX > 0 && state.currentIndex < mediaArray.length - 1) {
                    state.currentIndex++;
                } else if (diffX < 0 && state.currentIndex > 0) {
                    state.currentIndex--;
                }
        
                displayCurrentMedia(state);
        
                // Reset the swipe state to allow another swipe
                setTimeout(() => { 
                    state.isSwiping = false;
                    state.swipeLocked = false;
                }, 300);
            }
        }
        
        function handleEnd(state) {
            state.isSwiping = false;
        }
        
        function handleWheel(event, state, trackpadThreshold, mediaArray, displayCurrentMedia) {
            if (state.swipeLocked) return;
            state.swipeLocked = true;
        
            // Move one slide at a time
            if (Math.abs(event.deltaX) > Math.abs(event.deltaY) && Math.abs(event.deltaX) > trackpadThreshold) {
                if (event.deltaX > 0 && state.currentIndex < mediaArray.length - 1) {
                    state.currentIndex++;
                } else if (event.deltaX < 0 && state.currentIndex > 0) {
                    state.currentIndex--;
                }
        
                displayCurrentMedia(state);
            }
        
            setTimeout(() => { state.swipeLocked = false; }, 300); // Reset the swipe lock
        }
        
        const swipeState = {
            isSwiping: false,
            swipeLocked: false,
            startX: 0,
            currentIndex: 0
        };
        
        function displayCurrentMedia(state) {
            const swiperContainer = document.getElementById('mediaSwiper');
            swiperContainer.swiper.slideTo(state.currentIndex);
        }
        
        // Prevent overscroll on mobile
        document.getElementById('postBox').addEventListener('touchmove', (e) => {
            if (e.target === document.getElementById('postBox')) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // Event listeners for gesture swiping
        const touchSensitivity = window.innerWidth < 768 ? 50 : 100; // Adaptive sensitivity
        document.getElementById('postBox').addEventListener('touchstart', (e) => handleStart(e, swipeState));
        document.getElementById('postBox').addEventListener('touchmove', (e) => handleMove(e, swipeState, touchSensitivity, swiperWrapper.children, displayCurrentMedia));
        document.getElementById('postBox').addEventListener('touchend', () => handleEnd(swipeState));
        document.getElementById('postBox').addEventListener('mousedown', (e) => handleStart(e, swipeState));
        document.getElementById('postBox').addEventListener('mousemove', (e) => handleMove(e, swipeState, 100, swiperWrapper.children, displayCurrentMedia));
        document.getElementById('postBox').addEventListener('mouseup', () => handleEnd(swipeState));
        document.getElementById('postBox').addEventListener('wheel', (e) => handleWheel(e, swipeState, 50, swiperWrapper.children, displayCurrentMedia));
        
        displayFiles.forEach((file, index) => {
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');

            const mediaWrapper = document.createElement('div');
            mediaWrapper.classList.add('media-wrapper');
            mediaWrapper.style.position = 'relative';

            const closeIcon = document.createElement('i');
            closeIcon.classList.add('fa-solid', 'fa-x', 'post-close-icon');
            closeIcon.style.display = 'block';
            closeIcon.onclick = function() {
                swiperWrapper.removeChild(slide);

                // Check if there are any remaining slides
                if (swiperWrapper.children.length === 0) {
                    swiperContainer.style.display = 'none'; // Hide the swiper container
                    postBox.classList.remove('filled'); // Remove the 'filled' class
                    // Also hide the post-close-icon since there are no files left
                    document.querySelectorAll('.post-close-icon').forEach(icon => {
                        icon.style.display = 'none';
                    });
                } else {
                    swiperContainer.swiper.update(); // Update the swiper
                }
            };

            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                img.style.maxWidth = '100%';
                img.style.maxHeight = '100%';
                img.style.objectFit = 'contain';
                mediaWrapper.appendChild(img);
            } else if (file.type.startsWith('video/')) {
                const video = document.createElement('video');
                video.src = URL.createObjectURL(file);
                video.controls = true;
                video.style.maxWidth = '100%';
                video.style.maxHeight = '100%';
                video.style.objectFit = 'contain';
                mediaWrapper.appendChild(video);
            }

            mediaWrapper.appendChild(closeIcon);
            slide.appendChild(mediaWrapper);
            swiperWrapper.appendChild(slide);
        });

        if (swiperContainer.swiper) {
            swiperContainer.swiper.update();
        } else {
            new Swiper('.swiper-container', {
                loop: false,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    dynamicBullets: true, // Add this option to show dynamic dots
                    dynamicMainBullets: 3, // Adjust this number to show more or fewer dots
                },
                touchRatio: 0, // Disable touch swiping
                simulateTouch: false, // Disable swiping by simulating touch
                grabCursor: false, // Disable the grab cursor on hover
                allowTouchMove: false, // Disable touch movement
            });
        }
    }
}

function adjustPostboxHeight(media) {
    const postBox = document.getElementById('postBox');
    const aspectRatio = media.videoWidth / media.videoHeight || media.naturalWidth / media.naturalHeight;

    if (aspectRatio > 1) {
        postBox.style.paddingTop = (100 / aspectRatio) + '%';
    } else {
        postBox.style.paddingTop = (aspectRatio * 100) + '%';
    }
}

document.querySelectorAll('.swiper-slide img, .swiper-slide video').forEach(media => {
    media.onload = () => adjustPostboxHeight(media);
    media.onloadedmetadata = () => adjustPostboxHeight(media);
});

// Gesture Swiping Method-2
function handleStart(event, state) {
    if (state.swipeLocked) return;
    state.isSwiping = true;
    state.startX = event.clientX || event.touches[0].clientX;
}

function handleMove(event, state, swipeSensitivity, mediaArray, displayCurrentMedia) {
    if (!state.isSwiping || state.swipeLocked) return;

    const currentX = event.clientX || event.touches[0].clientX;
    const diffX = state.startX - currentX;

    if (Math.abs(diffX) > swipeSensitivity) {
        state.swipeLocked = true;
        if (diffX > 0 && state.currentIndex < mediaArray.length - 1) {
            state.currentIndex++;
        } else if (diffX < 0 && state.currentIndex > 0) {
            state.currentIndex--;
        }
        displayCurrentMedia(state);
        setTimeout(() => { state.swipeLocked = false; }, 300);
    }
}

function handleEnd(state) {
    state.isSwiping = false;
}

function handleWheel(event, state, trackpadThreshold, mediaArray, displayCurrentMedia) {
    if (state.swipeLocked) return;
    state.swipeLocked = true;

    if (Math.abs(event.deltaX) > Math.abs(event.deltaY) && Math.abs(event.deltaX) > trackpadThreshold) {
        if (event.deltaX > 0 && state.currentIndex < mediaArray.length - 1) {
            state.currentIndex++;
        } else if (event.deltaX < 0 && state.currentIndex > 0) {
            state.currentIndex--;
        }
        displayCurrentMedia(state);
    }

    setTimeout(() => { state.swipeLocked = false; }, 300);
}

const swipeState = {
    isSwiping: false,
    swipeLocked: false,
    startX: 0,
    currentIndex: 0
};

function displayCurrentMedia(state) {
    const swiperContainer = document.getElementById('mediaSwiper');
    swiperContainer.swiper.slideTo(state.currentIndex);
}

// Event listeners for gesture swiping
document.getElementById('postBox').addEventListener('touchstart', (e) => handleStart(e, swipeState));
document.getElementById('postBox').addEventListener('touchmove', (e) => handleMove(e, swipeState, 30, swiperWrapper.children, displayCurrentMedia));
document.getElementById('postBox').addEventListener('touchend', () => handleEnd(swipeState));
document.getElementById('postBox').addEventListener('mousedown', (e) => handleStart(e, swipeState));
document.getElementById('postBox').addEventListener('mousemove', (e) => handleMove(e, swipeState, 30, swiperWrapper.children, displayCurrentMedia));
document.getElementById('postBox').addEventListener('mouseup', () => handleEnd(swipeState));
document.getElementById('postBox').addEventListener('wheel', (e) => handleWheel(e, swipeState, 20, swiperWrapper.children, displayCurrentMedia));




let musicFileName = ""; // Variable to store the actual music file name

function displayMusic(input) {
    const musicBox = document.getElementById('musicBox');
    musicBox.innerHTML = ''; // Clear previous music selection

    const files = input.files;
    if (files.length > 0) {
        // Capture the actual music file name
        const file = files[0];
        musicFileName = file.name; // Get the full file name including extension
        console.log("Music File Name Captured:", musicFileName); // Debug: check the file name

        // Create a container for the file name and audio element
        const fileContainer = document.createElement('div');
        fileContainer.style.display = 'flex';
        fileContainer.style.flexDirection = 'column';
        fileContainer.style.alignItems = 'center';
        fileContainer.style.position = 'relative';
        fileContainer.style.width = '100%';

        // Create a span to hold the file name with scrolling effect
        const fileNameSpan = document.createElement('span');
        fileNameSpan.textContent = musicFileName;
        fileNameSpan.style.display = 'block';
        fileNameSpan.style.width = '100%';
        fileNameSpan.style.overflow = 'hidden';
        fileNameSpan.style.whiteSpace = 'nowrap';
        fileNameSpan.style.textOverflow = 'ellipsis';
        fileNameSpan.style.textAlign = 'center';
        fileNameSpan.style.marginBottom = '10px'; // Add space between the file name and audio player
        fileNameSpan.style.padding = '0 10px'; // Add some padding for better appearance

        // Create an audio element for the uploaded file
        const audioElement = document.createElement('audio');
        audioElement.src = URL.createObjectURL(file);
        audioElement.controls = true;
        audioElement.style.width = '100%';

        // Add the file name span and audio element to the fileContainer
        fileContainer.appendChild(fileNameSpan);
        fileContainer.appendChild(audioElement);

        // Add the fileContainer to the musicBox
        musicBox.appendChild(fileContainer);

        // Create a close icon specifically for the music
        const closeMusicIcon = document.createElement('i');
        closeMusicIcon.classList.add('fa-solid', 'fa-x', 'close-music-icon');
        closeMusicIcon.style.cursor = 'pointer';
        closeMusicIcon.style.position = 'absolute';
        closeMusicIcon.style.top = '10px';
        closeMusicIcon.style.right = '10px';
        closeMusicIcon.onclick = function() {
            // Clear only the audio element when the close icon is clicked
            musicBox.innerHTML = ''; // Clears the audio element

            // Re-add the "Choose Music" button
            const chooseMusicButton = document.createElement('div');
            chooseMusicButton.classList.add('choose-music-button');
            chooseMusicButton.onclick = function() {
                input.click(); // Use the original input reference
            };
            chooseMusicButton.innerHTML = '<i class="fa-solid fa-music"></i><span class="blue-text-post">Choose Music</span>';
            musicBox.appendChild(chooseMusicButton);

            // Reset the input field to allow the same file to be chosen again
            input.value = ''; // Reset the file input value

            musicFileName = ''; // Clear the stored music file name
        };

        // Add the close music icon to the musicBox
        musicBox.appendChild(closeMusicIcon);

        // Mark the musicBox as filled
        musicBox.classList.add('filled');
    }
}





function handleMusicDrop(e) {
    preventDefaults(e);
    const dt = e.dataTransfer;
    const files = dt.files;
    displayMusic({ files });
}

function handlePostDrop(e) {
    preventDefaults(e);
    const dt = e.dataTransfer;
    const files = dt.files;
    displayPost({ files });
}

const postBox = document.getElementById('postBox');
const musicBox = document.getElementById('musicBox');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    postBox.addEventListener(eventName, preventDefaults, false);
    musicBox.addEventListener(eventName, preventDefaults, false);
});

['dragenter', 'dragover'].forEach(eventName => {
    postBox.addEventListener(eventName, () => highlight(postBox), false);
    musicBox.addEventListener(eventName, () => highlight(musicBox), false);
});

['dragleave', 'drop'].forEach(eventName => {
    postBox.addEventListener(eventName, () => unhighlight(postBox), false);
    musicBox.addEventListener(eventName, () => unhighlight(musicBox), false);
});

postBox.addEventListener('drop', handlePostDrop, false);
musicBox.addEventListener('drop', handleMusicDrop, false);

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight(box) {
    box.classList.add('highlight');
}

function unhighlight(box) {
    box.classList.remove('highlight');
}
















function previewPost() {
    const postBox = document.getElementById('postBox');
    const previewWrapper = document.querySelector('.post-preview-swiper-wrapper');
    const previewPagination = document.querySelector('.post-preview-swiper-pagination');
    const musicBox = document.getElementById('musicBox');

    // Check if the postBox has any media
    const mediaElements = postBox.querySelectorAll('.media-wrapper img, .media-wrapper video');
    if (mediaElements.length === 0) {
        const customAlert = document.getElementById('customAlert');
        customAlert.classList.remove('hidden');  // Show custom alert

        setTimeout(() => {
            customAlert.classList.add('hidden');  // Hide custom alert after 3 minutes
        }, 30000);

        return;  // Exit the function if there's no media to preview
    }

    document.getElementById('previewBoxPost').style.display = 'block'; // Always show preview box
    document.getElementById('closePreviewPosts').style.display = 'block'; // Show Close Preview button
    document.getElementById('uploadPosts').style.display = 'block'; // Show Upload button

    // Hide other elements
    document.querySelectorAll('.post-close-icon, .close-music-icon, #postPreviewButton').forEach(el => {
        el.style.display = 'none';
    });

    const originalMusicFile = musicBox.querySelector('audio');
    const mediaArray = Array.from(mediaElements);
    let currentIndex = 0;

    const musicSelected = !!originalMusicFile;
    let clonedMusicFile;
    let isPlaying = false;
    if (musicSelected) {
        clonedMusicFile = originalMusicFile.cloneNode(true);
    }

    function displayCurrentMedia() {
        previewWrapper.style.transition = 'transform 0.5s ease-out'; // Smoother transition
        previewWrapper.innerHTML = '';
        const media = mediaArray[currentIndex].cloneNode(true);

        media.style.width = '100%';
        media.style.height = '100%';
        media.style.objectFit = 'contain';

        const mediaContainer = document.createElement('div');
        mediaContainer.style.position = 'relative';
        mediaContainer.style.display = 'flex';
        mediaContainer.style.justifyContent = 'center';
        mediaContainer.style.alignItems = 'center';
        mediaContainer.style.width = '100%';
        mediaContainer.style.height = '100%';

        if (media.tagName.toLowerCase() === 'img' && musicSelected) {
            const musicIcon = document.createElement('i');
            musicIcon.classList.add('fa-solid', 'fa-music', 'music-icon');
            musicIcon.style.position = 'absolute';
            musicIcon.style.bottom = '10px';
            musicIcon.style.left = '10px';
            musicIcon.style.fontSize = '24px';
            musicIcon.style.cursor = 'pointer';
            musicIcon.style.color = '#ccc';

            function toggleMusic() {
                if (isPlaying) {
                    clonedMusicFile.pause();
                    isPlaying = false;
                } else {
                    clonedMusicFile.play();
                    isPlaying = true;
                }
            }

            media.addEventListener('click', toggleMusic);
            musicIcon.addEventListener('click', toggleMusic);

            mediaContainer.appendChild(media);
            mediaContainer.appendChild(musicIcon);

            const scrollTextContainer = document.createElement('div');
            scrollTextContainer.classList.add('scroll-text-container');
            scrollTextContainer.style.position = 'absolute';
            scrollTextContainer.style.bottom = '10px';
            scrollTextContainer.style.width = '100%';
            scrollTextContainer.style.whiteSpace = 'nowrap';
            scrollTextContainer.style.overflow = 'hidden';
            scrollTextContainer.style.textOverflow = 'ellipsis';

            const scrollText = document.createElement('div');
            scrollText.textContent = musicFileName;
            scrollText.style.animation = 'scrollText 10s linear infinite';
            scrollText.style.color = '#ccc';

            const style = document.createElement('style');
            style.innerHTML = `
                @keyframes scrollText {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
            `;
            document.head.appendChild(style);

            scrollTextContainer.appendChild(scrollText);
            mediaContainer.appendChild(scrollTextContainer);

            previewWrapper.appendChild(mediaContainer);
        } else {
            if (isPlaying) {
                clonedMusicFile.pause();
                isPlaying = false;
            }
            previewWrapper.appendChild(media);
        }

        updatePagination();
    }

    function updatePagination() {
        previewPagination.innerHTML = '';
        const visibleDots = 5;
        const totalDots = mediaArray.length;

        let startIndex = Math.max(currentIndex - Math.floor(visibleDots / 2), 0);
        let endIndex = Math.min(startIndex + visibleDots, totalDots);

        if (endIndex - startIndex < visibleDots) {
            startIndex = Math.max(endIndex - visibleDots, 0);
        }

        for (let i = startIndex; i < endIndex; i++) {
            const dot = document.createElement('span');
            dot.classList.add('pagination-dot');

            const distanceFromActive = Math.abs(i - currentIndex);
            switch (distanceFromActive) {
                case 0:
                    dot.style.width = '14px';
                    dot.style.height = '14px';
                    dot.classList.add('active');
                    break;
                case 1:
                    dot.style.width = '10px';
                    dot.style.height = '10px';
                    break;
                case 2:
                    dot.style.width = '8px';
                    dot.style.height = '8px';
                    break;
                default:
                    dot.style.width = '6px';
                    dot.style.height = '6px';
                    break;
            }

            dot.addEventListener('click', () => {
                currentIndex = i;
                displayCurrentMedia();
            });

            previewPagination.appendChild(dot);
        }
    }

    let startX = 0;
    let startY = 0;
    let isSwiping = false;
    let swipeLocked = false; // Flag to prevent multiple swipes in one gesture

    // Enhanced touch handling for swipe gestures on touchscreens
    previewWrapper.addEventListener('touchstart', (event) => {
        if (swipeLocked) return;
        isSwiping = true;
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
    });

    previewWrapper.addEventListener('touchmove', (event) => {
        if (!isSwiping || swipeLocked) return;

        const currentX = event.touches[0].clientX;
        const currentY = event.touches[0].clientY;
        const diffX = startX - currentX;
        const diffY = startY - currentY;

        // Only allow horizontal swiping, prevent vertical scroll interference
        if (Math.abs(diffX) > Math.abs(diffY)) {
            event.preventDefault(); // Prevent vertical scroll

            if (Math.abs(diffX) > 30) { // Adjust the sensitivity as needed
                swipeLocked = true;
                if (diffX > 0 && currentIndex < mediaArray.length - 1) {
                    currentIndex++;
                } else if (diffX < 0 && currentIndex > 0) {
                    currentIndex--;
                }
                displayCurrentMedia();
                setTimeout(() => (swipeLocked = false), 300);
            }
        }
    });

    previewWrapper.addEventListener('touchend', () => {
        isSwiping = false;
    });

    previewWrapper.addEventListener('wheel', handleWheel, { passive: true });

    function handleWheel(event) {
        if (swipeLocked) return; // Prevent further action if swipe is locked
        swipeLocked = true; // Lock swipe for wheel action

        if (Math.abs(event.deltaX) > Math.abs(event.deltaY) && Math.abs(event.deltaX) > 5) {
            previewWrapper.style.transition = 'transform 0.5s ease-out'; // Smoother transition
            if (event.deltaX > 0 && currentIndex < mediaArray.length - 1) {
                currentIndex++; // Swipe to next item
            } else if (event.deltaX < 0 && currentIndex > 0) {
                currentIndex--; // Swipe to previous item
            }

            displayCurrentMedia();
        }

        setTimeout(() => (swipeLocked = false), 300); // Unlock swipe after a short delay
    }

    displayCurrentMedia();
}




// Function to close the post preview and hide buttons
function closePreviewPost() {
    const previewWrapper = document.querySelector('.post-preview-swiper-wrapper');
    const previewPagination = document.querySelector('.post-preview-swiper-pagination');

    // Clear the content of preview wrapper and pagination
    previewWrapper.innerHTML = ''; 
    previewPagination.innerHTML = ''; 

    // Hide the buttons but keep the preview box visible
    document.getElementById('closePreviewPosts').style.display = 'none';
    document.getElementById('uploadPosts').style.display = 'none';

    // Optionally, you can add this line if you want to keep the preview box visible without content
    // document.getElementById('previewBoxPost').style.display = 'block';

    // Show other elements
    document.querySelectorAll('.post-close-icon, .close-music-icon, #postPreviewButton').forEach(el => {
        el.style.display = 'block';
    });
}

// Ensure buttons are hidden initially
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('closePreviewPosts').style.display = 'none';
    document.getElementById('uploadPosts').style.display = 'none';
});



// CSS for Pagination Dots
// CSS for Pagination Dots
const style = document.createElement('style');
style.textContent = `
    .pagination-dot {
        display: inline-block;
        width: 10px;  /* Default size for inactive dots */
        height: 10px;
        margin: 0 4px;
        background-color: rgba(204, 204, 204, 0.8);  /* Semi-transparent gray */
        border-radius: 50%;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.3s ease;  /* Smooth transitions */
    }
    .pagination-dot.active {
        width: 14px;  /* Larger size for the active dot */
        height: 14px;
        background-color: blue;  /* Bright blue for the active dot */
        transform: scale(1.2);  /* Slight scaling for emphasis */
        animation: pulse 1.5s infinite;  /* Circular pulsing effect */
    }
    .pagination-dot:hover {
        background-color: blue;  /* Change color on hover */
        transform: scale(1.1);  /* Slight scaling on hover */
    }

    /* Animation for the active dot to create a pulsing effect */

`;
document.head.appendChild(style);

document.getElementById('okayButton').addEventListener('click', function() {
    document.getElementById('customAlert').classList.add('hidden');
});











function goToPostDetails() {
    // Hide all content within the .box-content
    document.querySelectorAll('.box-content > div').forEach(function(content) {
        content.style.display = 'none';
    });

    // Show the Post Details content within the .box-content
    document.getElementById('postDetailsContent').style.display = 'block';

    // Highlight the Post Details step in the steps navigation
    document.querySelectorAll('.steps .step').forEach(function(step) {
        step.classList.remove('active');
    });
    document.querySelector(`.steps .step[onclick="showSectionContent('postDetails')"]`).classList.add('active');
}

// Event listener for the Choose Post Next button
document.getElementById('choosePostnextButton').addEventListener('click', goToPostDetails);

// Ensure the corresponding content divs are correctly identified in your HTML
document.getElementById('postDetailsContent').style.display = 'none'; // Initial state hidden
document.getElementById('chooseMediaContent').style.display = 'block'; // Assuming this is the initial state







function postDetailsGoBackButton() {
    // Hide the Post Details section
    document.getElementById('postDetailsContent').style.display = 'none';

    // Show the Choose Posts section
    document.getElementById('choosePostsContent').style.display = 'block';

    // Highlight the Choose Posts step in the steps navigation
    document.querySelectorAll('.steps .step').forEach(function(step) {
        step.classList.remove('active');
    });
    document.querySelector(`.steps .step[onclick="showSectionContent('choosePosts')"]`).classList.add('active');
}


function postDetailsNextButton() {
    // Hide the Post Details section
    document.getElementById('postDetailsContent').style.display = 'none';

    // Show the Advanced section
    document.getElementById('advanced-postContent').style.display = 'block';

    // Highlight the Advanced step in the steps navigation
    document.querySelectorAll('.steps .step').forEach(function(step) {
        step.classList.remove('active');
    });
    document.querySelector(`.steps .step[onclick="showSectionContent('advanced-post')"]`).classList.add('active');
}









function postadvancedGoBackButton() {
    // Hide the Advanced section
    document.getElementById('advanced-postContent').style.display = 'none';

    // Show the Post Details section
    document.getElementById('postDetailsContent').style.display = 'block';

    // Highlight the Post Details step in the steps navigation
    document.querySelectorAll('.steps .step').forEach(function(step) {
        step.classList.remove('active');
    });
    document.querySelector(`.steps .step[onclick="showSectionContent('postDetails')"]`).classList.add('active');
}



function postadvancedNextButton() {
    // Hide the Advanced section
    document.getElementById('advanced-postContent').style.display = 'none';

    // Show the Privacy section
    document.getElementById('privacyVisibilityPostContent').style.display = 'block';

    // Highlight the Privacy step in the steps navigation
    document.querySelectorAll('.steps .step').forEach(function(step) {
        step.classList.remove('active');
    });
    document.querySelector(`.steps .step[onclick="showSectionContent('privacyVisibilityPost')"]`).classList.add('active');
}






function postprivacyGoBackButton() {
    // Hide the Privacy section
    document.getElementById('privacyVisibilityPostContent').style.display = 'none';

    // Show the Advanced section
    document.getElementById('advanced-postContent').style.display = 'block';

    // Highlight the Advanced step in the steps navigation
    document.querySelectorAll('.steps .step').forEach(function(step) {
        step.classList.remove('active');
    });
    document.querySelector(`.steps .step[onclick="showSectionContent('advanced-post')"]`).classList.add('active');
}




















// Function to open the "Choose Post Terms" modal
function openChoosePostTermsModal() {
    const modal = document.getElementById('ChoosePostModalTerms');
    if (modal) {
        modal.style.display = 'block';
        document.body.classList.add('modal-open'); // Disable interactions with other sections
    }
}

// Event listener for the close icon inside the modal
document.getElementById('ChoosePostModalTermsCloseIcon').onclick = function() {
    const modal = document.getElementById('ChoosePostModalTerms');
    if (modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open'); // Re-enable interactions with other sections
    }
};

// Ensure that the "learn more" span opens the modal when clicked
document.getElementById('learnMoreChoosePost').onclick = openChoosePostTermsModal;








// Function to open the "Advanced Post Content Warning" modal
function openAdvancedPostContentWarningModal() {
    const modal = document.getElementById('advancedPostContentWarning');
    if (modal) {
        modal.style.display = 'block';
        document.body.classList.add('modal-open'); // Disable interactions with other sections
    }
}

// Event listener for the close icon inside the "Advanced Post Content Warning" modal
document.getElementById('advancedPostContentWarningcloseicon').onclick = function() {
    const modal = document.getElementById('advancedPostContentWarning');
    if (modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open'); // Re-enable interactions with other sections
    }
};

// Ensure that the "learn more" span opens the "Advanced Post Content Warning" modal when clicked
document.getElementById('openChoosePostConentWarningModal').onclick = openAdvancedPostContentWarningModal;









// Function to open the "Age Restrictions Modal"
function openAgeRestrictionsModalPost() {
    const modal = document.getElementById('AgeRestrictionsModalPost');
    if (modal) {
        modal.style.display = 'block';
        document.body.classList.add('modal-open'); // Disable interactions with other sections
    }
}

// Event listener for the close icon inside the "Age Restrictions Modal"
document.getElementById('AgeRestrictionsModalPostcloseicon').onclick = function() {
    const modal = document.getElementById('AgeRestrictionsModalPost');
    if (modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open'); // Re-enable interactions with other sections
    }
};

// Ensure that the "learn more" span opens the "Age Restrictions Modal" when clicked
document.getElementById('openAgeRestrictionsModalPost').onclick = openAgeRestrictionsModalPost;









// Function to open the "License Type Modal"
function openLicenseTypeModalPost() {
    const modal = document.getElementById('openLicenseTypeModalPost');
    if (modal) {
        modal.style.display = 'block';
        document.body.classList.add('modal-open'); // Disable interactions with other sections
    }
}

// Event listener for the close icon inside the "License Type Modal"
document.getElementById('openLicenseTypeModalPostcloseicon').onclick = function() {
    const modal = document.getElementById('openLicenseTypeModalPost');
    if (modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open'); // Re-enable interactions with other sections
    }
};

// Ensure that the "learn more" span opens the "License Type Modal" when clicked
document.getElementById('openLicenseModalPost').onclick = openLicenseTypeModalPost;












// Function to toggle the visibility of the Post info box
function togglePostInfo() {
    // Get the Post info box element
    const postInfoBox = document.getElementById('postInfo');

    // Toggle the display property
    if (postInfoBox.style.display === "none" || postInfoBox.style.display === "") {
        postInfoBox.style.display = "block";
    } else {
        postInfoBox.style.display = "none";
    }
}

// Function to toggle the visibility of the Music info box
function toggleMusicInfo() {
    // Get the Music info box element
    const musicInfoBox = document.getElementById('MusicInfo');

    // Toggle the display property
    if (musicInfoBox.style.display === "none" || musicInfoBox.style.display === "") {
        musicInfoBox.style.display = "block";
    } else {
        musicInfoBox.style.display = "none";
    }
}




document.addEventListener("DOMContentLoaded", function() {
    // Get all info icons related to post details
    const postInfoIcons = document.querySelectorAll('.post-details-circle-info');

    postInfoIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Determine the corresponding info box using the icon's ID
            const infoBoxId = this.id.replace('postinfo', 'postinfoBox');
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










// Get the elements by their IDs
const infoIcon = document.getElementById('infoadvancedPost');
const infoBox = document.getElementById('infoBoxLocationTagsPost');

// Add a click event listener to the info icon
infoIcon.addEventListener('click', function() {
    // Toggle the display style of the info box between 'none' and 'block'
    if (infoBox.style.display === 'none' || infoBox.style.display === '') {
        infoBox.style.display = 'block';
    } else {
        infoBox.style.display = 'none';
    }
});
