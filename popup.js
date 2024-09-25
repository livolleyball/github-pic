(function() {
    function addHoverableClassToImages() {
        const container = document.querySelector('.markdown-body.entry-content.container-lg');
        if (!container) return;
        
        const images = container.querySelectorAll('img');
        images.forEach(image => {
            if (!image.classList.contains('hoverable-image')) {
                image.classList.add('hoverable-image');
                image.addEventListener('click', handleImageClick, true); // Use capture phase
            }
        });
    }

    function handleImageClick(event) {
        event.preventDefault(); // 阻止默认行为
        event.stopPropagation(); // 阻止事件传播
        openImagePopup(event.target.src);
    }

    function openImagePopup(src) {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.appendChild(overlay);

        // Create popup image
        const imgPopup = document.createElement('img');
        imgPopup.classList.add('image-popup');
        imgPopup.src = src;
        document.body.appendChild(imgPopup);

        // Show elements
        overlay.style.display = 'block';
        imgPopup.style.display = 'block';

        // Close popup on overlay click
        overlay.addEventListener('click', function() {
            closeImagePopup(overlay, imgPopup);
        });

        // Close popup on image click
        imgPopup.addEventListener('click', function() {
            closeImagePopup(overlay, imgPopup);
        });
    }

    function closeImagePopup(overlay, imgPopup) {
        overlay.style.display = 'none';
        imgPopup.style.display = 'none';
        document.body.removeChild(overlay);
        document.body.removeChild(imgPopup);
    }

    // Run the script when the page is fully loaded
    document.addEventListener('DOMContentLoaded', addHoverableClassToImages);
    // Also run whenever new nodes are added (for dynamically loaded content)
    const observer = new MutationObserver(addHoverableClassToImages);
    observer.observe(document.body, { childList: true, subtree: true });
})();
