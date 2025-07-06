// API Endpoints
const API_URLS = {
  rsg116: 'https://script.google.com/macros/s/AKfycbztdxz4Cm5x03Xs_1mdX9Uxkf4g51FqohS-SqoAn28CPuvMAAJgdJsYhstp57PogdY4/exec?action=getrsg116',
  ssg116: 'https://script.google.com/macros/s/AKfycbztdxz4Cm5x03Xs_1mdX9Uxkf4g51FqohS-SqoAn28CPuvMAAJgdJsYhstp57PogdY4/exec?action=getssg116'
};

// Cache for storing API responses
let cache = {
  rsg116: null,
  ssg116: null
};

const loadingIndicator = document.getElementById('loading-indicator');
const errorMessageContainer = document.getElementById('error-message-container');
const tableBody = document.querySelector('#data-table tbody');
const tableHead = document.querySelector('#data-table thead');

function showLoading(isLoading) {
    if (loadingIndicator) loadingIndicator.style.display = isLoading ? 'block' : 'none';
}

function displayError(message) {
    if (errorMessageContainer) {
        errorMessageContainer.textContent = message;
        errorMessageContainer.style.display = 'block';
    }
    if (tableBody) tableBody.innerHTML = ''; // Clear table on error
    if (tableHead) tableHead.innerHTML = ''; // Clear head on error
}

async function fetchData(category) {
    showLoading(true);
    displayError(''); // Clear previous errors
    
    // Check cache first
    if (cache[category]) {
        showLoading(false);
        return cache[category];
    }

    try {
        let endpoint;
        if (category === '1.16+') {
            endpoint = API_URLS.rsg116;
        } else if (category === 'SSG 1.16+') {
            endpoint = API_URLS.ssg116;
        } else {
            throw new Error('Categoria não suportada');
        }



        // Fetch category data
        let response;
        try {
            response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error(`Erro HTTP! status: ${response.status} ${response.statusText}`);
            }
            
            let data;
            try {
                data = await response.json();
                console.log('Category data received:', data);
            } catch (jsonError) {
                console.error('Error parsing category JSON:', jsonError);
                const responseText = await response.text();
                console.error('Response text:', responseText);
                throw new Error('Formato de resposta inválido');
            }
            
            // Check if data is an object with a runs array
            if (data && typeof data === 'object' && Array.isArray(data.runs)) {
                console.log('Found runs array in response:', data.runs);
                // Use the runs array
                data = data.runs;
            } else if (!Array.isArray(data)) {
                console.error('Expected array or object with runs array but got:', typeof data, data);
                throw new Error('Formato de dados inesperado: esperado um array ou objeto com propriedade runs');
            }
            
            // Cache the response
            cache[category] = data;
            return data;
        } catch (error) {
            console.error('Error fetching category data:', error);
            throw error; // Re-throw to be caught by the outer try-catch
        }
        return data;
        
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        displayError(`Erro ao carregar dados: ${error.message}`);
        return null;
    } finally {
        showLoading(false);
    }
}

function setTableHeaders(headers) {
    if (!tableHead) return;
    tableHead.innerHTML = ''; // Clear existing headers
    const headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    tableHead.appendChild(headerRow);
}

function renderCategoryData(category, data) {
    if (!tableBody || !data) return;
    tableBody.innerHTML = '';

    if (!Array.isArray(data) || data.length === 0) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 4; // Adjust based on your columns
        td.textContent = 'Nenhum dado encontrado para esta categoria.';
        td.style.textAlign = 'center';
        tr.appendChild(td);
        tableBody.appendChild(tr);
        return;
    }

    // Set table headers based on category
    const headers = ['#', 'Runner', 'Tempo', 'Data'];
    if (category === '1.16+') {
        headers.splice(3, 0, 'Bastion');
    } else if (category === 'SSG 1.16+') {
        headers.splice(3, 0, 'Seed');
    }
    setTableHeaders(headers);

    // Sort data by time (ascending)
    const sortedData = [...data].sort((a, b) => {
        const timeA = a[1].replace(':', '').replace('.', '');
        const timeB = b[1].replace(':', '').replace('.', '');
        return timeA.localeCompare(timeB);
    });

    
    for (let i = 0; i < sortedData.length; i++) {
        const run = sortedData[i];
        if (!run || run.length === 0) continue;

        const tr = document.createElement('tr');

        // Add rank
        const rankTd = document.createElement('td');
        if (i === 0) {
            rankTd.innerHTML = '<span style="color:rgb(255, 242, 58);">#1</span>';
        } else if (i === 1) {
            rankTd.innerHTML = '<span style="color:rgb(236, 242, 255);">#2</span>';
        } else if (i === 2) {
            rankTd.innerHTML = '<span style="color:rgb(156, 127, 83);">#3</span>';
        } else {
            rankTd.textContent = `#${i + 1}`;
        }
        tr.appendChild(rankTd);

        // Add runner name
        const runnerName = run[0] || 'Desconhecido';
        const nameTd = document.createElement('td');
        nameTd.textContent = runnerName;
        tr.appendChild(nameTd);

        // Add time
        const timeTd = document.createElement('td');
        timeTd.textContent = run[1] || '--:--';
        tr.appendChild(timeTd);

        // Add category-specific data
        if (category === '1.16+') {
            const bastionTd = document.createElement('td');
            bastionTd.textContent = run[2] || 'N/A';
            tr.appendChild(bastionTd);
        } else if (category === 'SSG 1.16+') {
            const seedTd = document.createElement('td');
            seedTd.textContent = run[2] || 'N/A';
            tr.appendChild(seedTd);
        }

        // Add date
        const dateTd = document.createElement('td');
        dateTd.textContent = run[3] || '--/--/----';
        tr.appendChild(dateTd);

        // Add click event for modal
        tr.addEventListener('mousedown', () => {
            const runData = {
                time: run[1] || '--:--',
                date: run[3] || '--/--/----',
                verified: run[4] || 'Não',
                runUrl: run[category === '1.16+' ? 6 : 5] || '',
                desc: run[category === '1.16+' ? 7 : 6] || 'Sem descrição',
                ...(category === '1.16+' 
                    ? { bastion: run[2] || 'N/A', seed: run[5] || 'N/A' }
                    : { seed: run[2] || 'N/A' })
            };
            openRunModal(runData);
        });

        tableBody.appendChild(tr);
    }
}

function extractYouTubeVideoId(url) {
    if (!url) return 'dQw4w9WgXcQ'; // Default video if URL is missing (Rickroll :D)
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : 'dQw4w9WgXcQ'; // Fallback to default if no match
}

function openRunModal(runData) {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('runModalContent');
    const modalIframe = document.getElementById('modalIframe');
    
    // Set modal content
    document.getElementById('modalDate').textContent = runData.date || '--/--/----';
    document.getElementById('modalVerified').textContent = runData.verified || 'Não';
    document.getElementById('modalBastion').textContent = runData.bastion || 'N/A';
    document.getElementById('modalSeed').textContent = runData.seed || 'N/A';
    document.getElementById('modalTime').textContent = runData.time || '--:--';
    document.getElementById('modalDesc').textContent = runData.desc || 'Sem descrição';
    
    // Set video if available
    if (runData.runUrl) {
        const videoId = extractYouTubeVideoId(runData.runUrl);
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
        modalIframe.src = embedUrl;
    } else {
        modalIframe.src = '';
    }
    
    // Show modal
    modalOverlay.style.display = 'flex';
    // Force reflow
    void modalOverlay.offsetHeight;
    // Add active class to trigger the CSS transition
    modalOverlay.classList.add('active');
    
    // Focus the close button for better accessibility
    document.getElementById('modal-close-btn').focus();
}

function closeRunModal() {
    const modal = document.getElementById('modal-overlay');
    const iframe = document.getElementById('modalIframe');
    
    if (modal) {
        // Remove active class to trigger the CSS transition
        modal.classList.remove('active');
        
        // Stop video when closing
        if (iframe) {
            // This is a more reliable way to stop YouTube videos
            const iframeSrc = iframe.src;
            iframe.src = ''; // This stops the video by removing the iframe source
            
            // If you want to be able to reopen the same video, you can store the src
            // and restore it when opening the modal again, but we'll handle that in openRunModal
        }
        
        // Wait for the transition to complete before hiding the modal
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

async function handleCatChange(categoryValue) {
    // Clear previous data
    if (tableBody) tableBody.innerHTML = '';
    if (tableHead) tableHead.innerHTML = '';
    displayError('');

    try {
        let data;
        
        switch (categoryValue) {
            case '1.16+':
                data = await fetchData('1.16+');
                break;
                
            case 'SSG 1.16+':
                data = await fetchData('SSG 1.16+');
                break;
                
            default:
                displayError('Categoria não implementada ainda.');
                return;
        }
        
        if (data) {
            renderCategoryData(categoryValue, data);
        }
    } catch (error) {
        console.error('Error handling category change:', error);
        displayError(`Erro ao carregar dados: ${error.message}`);
    }
}

// Initial load (e.g., for the default selected category)
document.addEventListener('DOMContentLoaded', () => {
    const initialCategory = document.getElementById('cat').value;
    handleCatChange(initialCategory);
    
    // Close modal when clicking outside content
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeRunModal();
            }
        });
    }
    });
    // Close modal if overlay is clicked
     document.getElementById('modal-overlay').addEventListener('click', function(event) {
        if (event.target === this) { // Ensure click is on overlay itself, not children
            closeRunModal();
        }
    });

// Prefetching and fast navigation (from original script)
// Consider if this is still needed with modern browser caching and single-page app feel.
document.querySelectorAll('a.back-button').forEach(link => {
    link.addEventListener('mouseenter', () => {
      if (!link.dataset.prefetched) {
        const prefetch = document.createElement('link');
            prefetch.rel = 'prefetch';
            prefetch.href = link.href;
            document.head.appendChild(prefetch);
            link.dataset.prefetched = 'true';
        }
    });
    link.addEventListener('mousedown', e => {
        if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
            // Standard navigation will occur, or use e.preventDefault() and window.location if special handling is needed.
        }
    });
});