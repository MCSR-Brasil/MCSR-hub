document.querySelectorAll('a').forEach(link => {
    // Prefetch on hover
    link.addEventListener('mouseenter', () => {
      if (!link.dataset.prefetched) {
        const prefetch = document.createElement('link');
        prefetch.rel = 'prefetch';
        prefetch.href = link.href;
        document.head.appendChild(prefetch);
        link.dataset.prefetched = 'true';
      }
    });
  
    // Navigate quickly on mousedown
    link.addEventListener('mousedown', e => {
      if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        window.location.href = link.href;
      }
    });
  });