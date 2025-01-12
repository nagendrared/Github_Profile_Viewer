document.getElementById('search-btn').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    if (username) {
        fetchGitHubProfile(username);
    }
});

function fetchGitHubProfile(username) {
    const url = `https://api.github.com/users/${username}`;
    
    // Fetch user profile data from GitHub API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Not Found') {
                alert('User not found! Please try again.');
            } else {
                displayProfile(data);
                fetchUserRepos(username);
            }
        })
        .catch(error => console.error('Error fetching profile:', error));
}

function displayProfile(user) {
    const profileContainer = document.getElementById('profile-container');
    profileContainer.style.display = 'block';

    const profileHTML = `
        <div class="profile-info">
            <img src="${user.avatar_url}" alt="Profile Picture">
            <h2>${user.name || user.login}</h2>
            <p>@${user.login}</p>
            <p>${user.bio || 'No bio available.'}</p>
            <p><strong>Followers:</strong> ${user.followers} | <strong>Following:</strong> ${user.following}</p>
            <p><strong>Public Repos:</strong> ${user.public_repos}</p>
        </div>
    `;
    profileContainer.innerHTML = profileHTML;
}

function fetchUserRepos(username) {
    const url = `https://api.github.com/users/${username}/repos?sort=created`;

    // Fetch user repositories from GitHub API
    fetch(url)
        .then(response => response.json())
        .then(repos => {
            displayRepos(repos);
        })
        .catch(error => console.error('Error fetching repos:', error));
}

function displayRepos(repos) {
    const repoListContainer = document.createElement('div');
    repoListContainer.classList.add('repo-list');

    if (repos.length > 0) {
        let repoHTML = '<h2 style="padding-bottom:20px;">Repositories:</h2><ul>';
        repos.forEach(repo => {
            repoHTML += `
                <li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a> - ${repo.language || 'No language'}
                </li>
            `;
        });
        repoHTML += '</ul>';
        repoListContainer.innerHTML = repoHTML;
    } else {
        repoListContainer.innerHTML = '<p>No repositories found.</p>';
    }

    const profileContainer = document.getElementById('profile-container');
    profileContainer.appendChild(repoListContainer);
}


