document.addEventListener('DOMContentLoaded', () => {
    console.log('Popup loaded, initializing...');
    loadSavedLinks();

    document.getElementById('linkedin-add').addEventListener('click', () => handleAddOrUpdate('linkedin', 'linkedin-add'));
    document.getElementById('github-add').addEventListener('click', () => handleAddOrUpdate('github', 'github-add'));
    document.getElementById('personal-add').addEventListener('click', () => handleAddOrUpdate('personal', 'personal-add'));
});

function handleAddOrUpdate(inputId, buttonId) {
    const inputField = document.getElementById(inputId);
    const button = document.getElementById(buttonId);
    const newLink = inputField.value.trim();

    console.log(`Attempting to save ${inputId}: ${newLink}`);

    if (newLink) {
        chrome.storage.sync.get({ links: {} }, (data) => {
            let links = data.links || {};
            links[inputId] = newLink;

            chrome.storage.sync.set({ links }, () => {
                console.log(`Saved ${inputId}: ${newLink}`);
                button.innerText = 'Update';
            });
        });
    } else {
        button.innerText = 'Add';
    }
}

function loadSavedLinks() {
    chrome.storage.sync.get({ links: {} }, (data) => {
        const links = data.links || {};
        console.log('Loaded links:', links);

        for (const [key, value] of Object.entries(links)) {
            console.log(`Setting value for ${key}: ${value}`);
            const inputField = document.getElementById(key);
            const button = document.getElementById(`${key}-add`);

            if (inputField) {
                console.log(`Found input field for ${key}`);
            } else {
                console.log(`Did not find input field for ${key}`);
            }

            if (button) {
                console.log(`Found button for ${key}`);
            } else {
                console.log(`Did not find button for ${key}`);
            }

            if (inputField && button) {
                inputField.value = value;
                button.innerText = 'Update';
                console.log(`Loaded ${key}: ${value}`);
            } else {
                console.log(`Could not find input or button for ${key}`);
            }
        }
    });
}
