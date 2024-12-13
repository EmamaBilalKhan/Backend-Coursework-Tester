async function handleRequest(buttonId, textAreaId, method, url) {
    const button = document.getElementById(buttonId);
    const textArea = document.getElementById(textAreaId);

    button.addEventListener("click", async () => {
        try {
            const requestBody = textArea.value.trim();

            const body = requestBody ? JSON.parse(requestBody) : {};
            const isGetRequest = method === "GET"?true:false;
            let fetchOptions = {};
            if (isGetRequest) {
                fetchOptions = {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
            }
            else{
                fetchOptions = {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                };
            }
            const response = await fetch(url, fetchOptions);

            const responseData = await response.json();
            textArea.value = JSON.stringify(responseData, null, 2);
        } catch (error) {
            textArea.value = `Error: ${error.message}`;
        }
    });
}

handleRequest("Get-User-Button", "Get-User-Text", "GET", "http://localhost:5000/Users");
handleRequest("Create-User-button", "Create-User-Text", "POST", "http://localhost:5000/Users/createUser");
handleRequest("Update-User-button", "Update-User-Text", "PUT", "http://localhost:5000/Users/updateUser");
handleRequest("Delete-User-Button", "Delete-User-Text", "DELETE", "http://localhost:5000/Users/deleteUser");
