enableSearch();

//Accept: application/vnd.github.v3+json

// The index.html file has a form with a search input. When the form is submitted, it should take the value of the input and search GitHub for user matches using the User Search Endpoint.

// Using the results of the search, display information about the users to the page. (You might include showing their username, avatar and a link to their profile.)

// Clicking on one of these users should send a request to the User Repos Endpoint and return data about all the repositories for that user.

// Using the response from the Users Repos Endpoint, display all the repositories for that user on the page.

function enableSearch() {
    const searchForm = document.querySelector('form')
    searchForm.addEventListener('submit', e => {
        e.preventDefault();
        const username = e.target.search.value;
        searchForm.reset()

        gatherSearchResults(username);
    })
}

function gatherSearchResults(username) {
    fetch(`https://api.github.com/search/users?q=${username}`)
    .then(response => response.json())
    .then(response => response.items)
    .then(userArray => userArray.forEach(user => {
        const userList = document.getElementById('user-list')  // accesses userlist in html file

        const userString = document.createElement('li') // Creates list item
    
        const link = document.createElement('a')
        link.href = user.html_url
        link.textContent = user.login

        userString.append(link)
        userList.append(userString) // populates list item with the username

        const userAvatar = document.createElement('img') 
        userAvatar.src = user.avatar_url
        userList.append(userAvatar) // populates list item with their avatar

        const blankLine = document.createElement('br')
        userList.append(blankLine)

        const repoButton = document.createElement('button')
        repoButton.textContent = 'Display Repos'
        repoButton.id = user.login;
        userList.append(repoButton)

        const listOfRepos = document.createElement('p')
        listOfRepos.textContent = ''
        userList.append(listOfRepos)

        const newUl = document.createElement('ul')
        newUl.id=`${user.login}2`
        listOfRepos.appendChild(newUl)

        repoButton.addEventListener('click', (e) => {
            fetch(`https://api.github.com/users/${e.target.id}/repos`)
            .then(response => response.json())
            .then(repoArray => repoArray.forEach(project => {
                console.log(project)

                const repoBullet = document.createElement('li')
                const linkToRepo = document.createElement('a')
                linkToRepo.href = project.html_url
                repoBullet.appendChild(linkToRepo)
                linkToRepo.textContent = project.name

                const individualRepo = document.getElementById(`${user.login}2`)
                individualRepo.append(repoBullet)

        
            }))

        })
   

    }))
}



// need to access the name of the repo
// link to the repo page.

