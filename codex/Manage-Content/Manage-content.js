document.addEventListener('DOMContentLoaded', () => {
    const dashboardIcon = document.querySelector('.dashboard-icon');
    const dashboardSection = document.querySelector('#dashboardSection');
    const closeDashboardIcon = document.querySelector('.close-dashboard-icon');

    // Show dashboard when dashboard icon is clicked
    dashboardIcon.addEventListener('click', () => {
        dashboardSection.style.display = 'flex'; // Show the dashboard section
    });

    // Hide dashboard when close icon is clicked
    closeDashboardIcon.addEventListener('click', () => {
        dashboardSection.style.display = 'none'; // Hide the dashboard section
    });
});






document.addEventListener('DOMContentLoaded', function() {
    const videoTab = document.getElementById('user-content-display-video-tab');
    const shortsTab = document.getElementById('user-content-display-shorts-tab');
    const postsTab = document.getElementById('user-content-display-posts-tab');

    const videoContent = document.getElementById('video-content');
    const shortsContent = document.getElementById('shorts-content');
    const postsContent = document.getElementById('posts-content');

    function activateTab(tab, content) {
        [videoTab, shortsTab, postsTab].forEach(t => t.classList.remove('active'));
        [videoContent, shortsContent, postsContent].forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        content.classList.add('active');
    }

    videoTab.addEventListener('click', () => activateTab(videoTab, videoContent));
    shortsTab.addEventListener('click', () => activateTab(shortsTab, shortsContent));
    postsTab.addEventListener('click', () => activateTab(postsTab, postsContent));
});









document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.real-time-tab');
    const tabContents = document.querySelectorAll('.real-time-tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(`${tab.id.replace('-tab', '')}-content`).classList.add('active');
        });
    });
});
