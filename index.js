
'use strict';


//Fetches data from API, converts and passes data to be displayed in DOM
function listApi(username) {
    const url = `https://api.github.com/users/${username}/repos`
    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {
    let user = responseJson[0].owner.login
    let userinfo = `
        <h4>User: <span class="user">${user}</span></h4>
        <h4><span class="user">Repos: ${responseJson.length}</span></h4>
        <ul class="results-list"></ul>
    `
    $('#results').append(userinfo)
     //loop through results and make a list of repos, including link and description
     for (let i = 0; i < responseJson.length; i++) {
        $('#results').append(`
        <div class="result-item"><li><h4>${responseJson[i].name}</h4>
        <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a>
        <p>${responseJson[i].description}</p>
        </li></div>
        `)
    }
     //removes hidden class to display results
    $('#results').removeClass('hidden');

}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const handle = $('#git-handle').val()
        console.log(handle)
        listApi(handle)
    })
}


$(watchForm)

