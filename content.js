// Function to create and attach datalist
function createDatalist(id, options) {
    let datalist = document.getElementById(id);
    if (!datalist) {
        datalist = document.createElement('datalist');
        datalist.id = id;
        document.body.appendChild(datalist);
        console.log(`Created datalist with ID: ${id}`);
    }
    datalist.innerHTML = ''; // Clear any existing options
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        datalist.appendChild(optionElement);
    });
    console.log(`Populated datalist ${id} with options:`, options);
}

// Function to autofill input fields
function autofillInputs(links) {
    const inputs = document.querySelectorAll('input[type="url"], input[type="text"]');
    console.log('Found input fields:', inputs);

    inputs.forEach(input => {
        const label = document.querySelector(`label[for="${input.id}"]`) || input.closest('label') || input.previousElementSibling;
        const labelText = label ? label.textContent.toLowerCase() : '';
        console.log('Checking input with label text:', labelText);

        if ((labelText.includes('linkedin') || labelText.includes('linkedin profile')) && links.linkedin) {
            input.setAttribute('list', 'linkedin-datalist');
            console.log('LinkedIn datalist attached to input:', input);
        } else if ((labelText.includes('github') || labelText.includes('github profile')) && links.github) {
            input.setAttribute('list', 'github-datalist');
            console.log('GitHub datalist attached to input:', input);
        } else if ((labelText.includes('portfolio') || labelText.includes('website') || labelText.includes('personal site')) && links['personal-web']) {
            input.setAttribute('list', 'personal-web-datalist');
            console.log('Personal web datalist attached to input:', input);
        }
    });

    if (links.linkedin) createDatalist('linkedin-datalist', [links.linkedin]);
    if (links.github) createDatalist('github-datalist', [links.github]);
    if (links['personal-web']) createDatalist('personal-web-datalist', [links['personal-web']]);
}

// Request the stored links from the background script
chrome.runtime.sendMessage({ type: 'getLinks' }, (response) => {
    console.log('Received links from background:', response);
    autofillInputs(response);
});
