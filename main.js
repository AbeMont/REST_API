console.log("Data Restful API");

document.querySelector('#person').addEventListener('click', function () {

    let name = document.getElementById('name').value.toLowerCase();
    let sections = undefined;

    console.log(name);

    if (name === "") {
        alert('Please enter a Name.');
        return false;
    } else {

        let request = new XMLHttpRequest();

        let personFound = false;

        request.onreadystatechange = function () {

            if (request.status === 200 && request.readyState === 4) {
                var response = JSON.parse(request.responseText);
                console.log(response);
                console.log(request);
                response.forEach((person) => {
                    //console.log(person.name.toLowerCase());
                    let firstName;
                    if (person.name.toLowerCase().split(' ')[0] == 'mrs.') {
                        firstName = person.name.toLowerCase().split(' ')[1];
                    } else {
                        firstName = person.name.toLowerCase().split(' ')[0];
                    }
                    //console.log(firstName);
                    if (name === firstName) {
                        if (!document.querySelector(`[data-section="${person.name}"]`)) {
                            createHtml(person, firstName);
                            personFound = true;
                            document.getElementById('name').value = "";
                        } else if (document.querySelector(`[data-section="${person.name}"]`)) {
                            personFound = true;
                            alert('Person is already Listed');
                            document.getElementById('name').value = "";
                            return false;
                        }

                    }
                });

                if (!personFound) {
                    alert(`No such person with the name of ${name} is found on the server`);
                    document.getElementById('name').value = "";
                }
            }

        }

        //request.open('GET', 'https://jsonplaceholder.typicode.com/users',true);
        request.open('GET', 'http://192.168.0.7/users.json', true);
        // request.setRequestHeader('Access-Control-Allow-Origin','http://192.168.0.7/');
        //request.setRequestHeader('Host','192.168.0.7');
        request.send();
    }

});

function createHtml(data, name) {
    console.log(data);
    let section = document.createElement('section');
    let anchor = document.createElement('a');
    let span = document.createElement('span');
    let img = document.createElement('img');
    let h3 = document.createElement('h3');
    let randomId = (Math.random() * 9999).toFixed();

    let currentSection = document.querySelector('.show-info').appendChild(section);
    currentSection.id = randomId;
    currentSection.classList.add('data-section');
    currentSection.dataset.section = data.name;

    let sectionAnchor = currentSection.appendChild(anchor);
    anchor.textContent = "X";
    anchor.href = "javascript:void(0)";
    anchor.classList.add('close');

    currentSection.appendChild(h3).textContent = data.name;
    currentSection.appendChild(img).src = data.profilePic;


    console.log(currentSection);

    getSections();

}

function getSections() {
    sections = Array.from(document.querySelectorAll('[data-section]'));
    removeSections(sections);
}

function removeSections(allSections) {
    allSections.forEach((section) => {
        section.children[0].addEventListener('click', () => {
            section.remove();
        });
    });
}