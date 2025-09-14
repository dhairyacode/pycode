const versionSelect = document.getElementById('versionSelect');
const themeSelect = document.getElementById('themeSelect');
const body = document.body;
const animatedTextElement = document.getElementById('animatedText');
const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const messagesContainer = document.getElementById('messagesContainer');

// Animated Text
const texts = [
    "CATCHING UP SYNTAX",
    "HELPING THE LOGIC CREATOR",
    "Creation of New Era with LOGICS AND SYNTAX"
];
let textIndex = 0;
let charIndex = 0;
let typingSpeed = 100;
let displayDelay = 3000;

function typeText() {
    if (charIndex < texts[textIndex].length) {
        animatedTextElement.textContent += texts[textIndex][charIndex];
        charIndex++;
        setTimeout(typeText, typingSpeed);
    } else {
        setTimeout(eraseText, displayDelay);
    }
}

function eraseText() {
    if (charIndex > 0) {
        animatedTextElement.textContent = texts[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseText, typingSpeed / 2);
    } else {
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeText, typingSpeed);
    }
}

// Theme Switcher
themeSelect.addEventListener('change', (e) => {
    const mode = e.target.value;
    body.classList.remove('light-mode', 'dark-mode');
    body.classList.add(`${mode}-mode`);
});

// Version Placeholder
versionSelect.addEventListener('change', (e) => {
    alert(`Version selected: ${e.target.value}`);
});

// Glow effect for dropdowns
[versionSelect, themeSelect].forEach(select => {
    select.addEventListener('focus', () => select.classList.add('glow'));
    select.addEventListener('blur', () => select.classList.remove('glow'));
});

// Python Libraries Data
const pythonLibraries = {
    "numpy": {
        "description": "NumPy is the fundamental package for scientific computing with Python. It provides support for large multidimensional arrays and matrices, along with a large collection of high-level mathematical functions to operate on these arrays.",
        "functions": [
            { "name": "numpy.array", "description": "Creates an array from object.", "usage": "import numpy as np\narr = np.array([1, 2, 3])" },
            { "name": "numpy.zeros", "description": "Creates array of zeros.", "usage": "arr = np.zeros((3, 3))" },
            { "name": "numpy.ones", "description": "Creates array of ones.", "usage": "arr = np.ones((3, 3))" },
            { "name": "numpy.arange", "description": "Returns evenly spaced values within a given interval.", "usage": "arr = np.arange(0, 10, 2)" }
        ]
    },
    "pandas": {
        "description": "Pandas is a fast, powerful, flexible, and easy-to-use open-source data analysis and manipulation tool built on top of the Python programming language.",
        "functions": [
            { "name": "pandas.DataFrame", "description": "A 2D labeled data structure with columns of potentially different types.", "usage": "import pandas as pd\ndf = pd.DataFrame({'A': [1, 2], 'B': [3, 4]})" },
            { "name": "pandas.read_csv", "description": "Reads a comma-separated values (csv) file into a DataFrame.", "usage": "df = pd.read_csv('file.csv')" },
            { "name": "pandas.concat", "description": "Concatenate pandas objects along a particular axis.", "usage": "result = pd.concat([df1, df2])" },
            { "name": "pandas.merge", "description": "Merge DataFrame or named Series objects with a database-style join.", "usage": "merged = pd.merge(df1, df2, on='key')" }
        ]
    },
    "matplotlib": {
        "description": "Matplotlib is a comprehensive library for creating static, animated, and interactive visualizations in Python.",
        "functions": [
            { "name": "matplotlib.pyplot.plot", "description": "Plot y versus x as lines and/or markers.", "usage": "import matplotlib.pyplot as plt\nplt.plot([1, 2, 3], [4, 5, 6])\nplt.show()" },
            { "name": "matplotlib.pyplot.scatter", "description": "Make a scatter plot of x vs y.", "usage": "plt.scatter([1, 2, 3], [4, 5, 6])\nplt.show()" },
            { "name": "matplotlib.pyplot.hist", "description": "Plot a histogram.", "usage": "plt.hist([1, 2, 2, 3, 3, 3, 4, 4, 4, 4])\nplt.show()" },
            { "name": "matplotlib.pyplot.bar", "description": "Make a bar plot.", "usage": "plt.bar([1, 2, 3], [4, 5, 6])\nplt.show()" }
        ]
    }
};

// Display Python Response
function displayPythonResponse(userText) {
    const trimmed = userText.trim();
    if (!trimmed) return;

    // YOU message
    const userDiv = document.createElement('div');
    userDiv.classList.add('chat-message', 'right');
    userDiv.textContent = trimmed;
    messagesContainer.appendChild(userDiv);
    userInput.value = '';

    // PYCODE response
    const libKey = trimmed.toLowerCase();
    const lib = pythonLibraries[libKey];

    const aiDiv = document.createElement('div');
    aiDiv.classList.add('chat-message', 'left');

    if (lib) {
        const block = document.createElement('div');
        block.classList.add('ai-response-block');

        const desc = document.createElement('p');
        desc.textContent = lib.description;
        block.appendChild(desc);

        if (lib.functions && lib.functions.length > 0) {
            const ul = document.createElement('ul');
            lib.functions.forEach(func => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${func.name}:</strong> ${func.description}<br><code>${func.usage}</code>`;
                ul.appendChild(li);
            });
            block.appendChild(ul);
        }

        aiDiv.appendChild(block);
    } else {
        aiDiv.textContent = `PYCODE: Invalid Library, Please Check the Documentation at "https://dhairyacode.github.io/docs-page.html"`;
    }

    messagesContainer.appendChild(aiDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Send Button
sendBtn.addEventListener('click', () => {
    displayPythonResponse(userInput.value);
});

// Enter key
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBtn.click();
});

// Start animated text
document.addEventListener('DOMContentLoaded', typeText);
