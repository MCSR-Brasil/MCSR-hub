function toggleSeeMore(button) {
    var container = button.closest('.run-desc-container');
    
    if (container) {
        // Find the .see-more-text element within the same container
        var seeMoreText = container.querySelector('.see-more-text');
        
        if (seeMoreText) {
            // Toggle the display style of the .see-more-text element
            var currentDisplay = window.getComputedStyle(seeMoreText).display;
            seeMoreText.style.display = currentDisplay === 'none' ? 'initial' : 'none';
        }
    }
}