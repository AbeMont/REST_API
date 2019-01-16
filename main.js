console.log("Data Rest API");

// Find Individuals by Name

document.querySelector('#firstname').addEventListener('click', function () {

    let name = document.getElementById('name-person').value.toLowerCase();
    let sections = undefined;

    console.log(name);

    if (name === "") {
        alert('Please enter a Name.');
        return false;
    } else {

        let request = new XMLHttpRequest();

        let personFound = false;

        request.onreadystatechange = function () {

            console.log(request);

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
                        if (!document.querySelector(`[data-section="${person.name} name"]`)) {
                            createHtml(person, firstName, 'name');
                            personFound = true;
                            document.getElementById('name-person').value = "";
                        } else if (document.querySelector(`[data-section="${person.name} name"]`)) {
                            personFound = true;
                            // alert(`${person.name} is already Listed`);
                            document.getElementById('name-person').value = "";
                            return false;
                        }

                    }
                });

                let modalLinks = Array.from(document.querySelectorAll('[data-open-modal]'));
                console.log(modalLinks)
                modalInfo(modalLinks);

                if (!personFound) {
                    alert(`No such person with the name of ${name} is found on the server`);
                    document.getElementById('name-person').value = "";
                }
            }

        }

        //request.open('GET', 'https://jsonplaceholder.typicode.com/users',true);
        //request.open('GET','http://192.168.0.7/users.json',true);
        request.open('GET', './users.json', true);
        // request.setRequestHeader('Access-Control-Allow-Origin','http://192.168.0.7/');
        //request.setRequestHeader('Host','192.168.0.7');
        request.send();
    }

});

// Get by Company

document.querySelector('#company-btn').addEventListener('click', () => {

    let company = document.getElementById('company-person').value.toLowerCase();
    let companyFound = false;

    console.log(company);

    if (company === "") {
        alert("Please enter a company name.");
        return false;
    } else {

        let http = new XMLHttpRequest();

        http.onreadystatechange = () => {
            if (http.status === 200 && http.readyState === 4) {
                let data = JSON.parse(http.responseText);
                console.log(data);
                data.forEach((person) => {
                    let companyName = person.company.name;
                    if (companyName === company) {
                        console.log(person);
                        if (document.querySelector(`[data-section="${person.name} company"]`)) {
                            document.getElementById('company-person').value = "";
                            companyFound = true;
                            return false;
                        } else if (!document.querySelector(`[data-section="${person.name} company"]`)) {
                            createHtml(person, person.name, 'company');
                            document.getElementById('company-person').value = "";
                            companyFound = true;
                        }
                    }
                });

                let modalLinks = Array.from(document.querySelectorAll('[data-open-modal]'));
                modalInfo(modalLinks);

                if (!companyFound) {
                    alert(`No company with the name of ${company} is found in the server.`);
                    document.getElementById('company-person').value = "";
                }
            }
        }

        // http.open('GET','http://192.168.0.7/users.json',true);
        http.open('GET', './users.json', true);
        http.send();

    }



});

// Get by occupation
document.getElementById('occupation-btn').addEventListener('click', () => {

    let value = document.querySelector('#occupation-person').value;
    let occupationFound = false;

    console.log(value);

    if (value == '') {
        alert('Please enter an occupation');
        return false;
    } else {

        let http = new XMLHttpRequest();

        http.onreadystatechange = () => {
            if (http.status === 200 && http.readyState === 4) {
                let data = JSON.parse(http.responseText);
                console.log(data);
                data.forEach((person) => {
                    let occupation = person.company.occupation;
                    console.log(occupation);
                    if (occupation === value) {
                        console.log(person);
                        if (!document.querySelector(` [data-section ="${person.name} occupation"] `)) {
                            occupationFound = true;
                            document.querySelector('#occupation-person').value = '';
                            createHtml(person, person.name, 'occupation');
                        } else if (document.querySelector(` [data-section ="${person.name} occupation"] `)) {
                            occupationFound = true;
                            document.querySelector('#occupation-person').value = '';
                        }
                    } else {
                        return false;
                    }

                });

                let modalLinks = Array.from(document.querySelectorAll('[data-open-modal]'));
                modalInfo(modalLinks);

                if (!occupationFound) {
                    alert('Please enter a valid Occupation.');
                    document.querySelector('#occupation-person').value = '';
                }

            }
        }

        // http.open('GET','http://192.168.0.7/users.json',true);
        http.open('GET', './users.json', true);
        http.send();

    }

});

////////////////
// Modal
/////////////

document.querySelector('.modal__close').addEventListener('click', () => {
    removeModal();
});

window.onclick = (e) => {
    if (e.target === document.querySelector('.modal')) {
        removeModal();
    }
}

function removeModal() {

    document.querySelector('.modal__body').classList.add('remove');
    setTimeout(() => {
        document.querySelector('.modal').classList.remove('active');
        document.querySelector('.modal__body').classList.remove('remove');
    }, 300);

    // Clear Modal Information

    let modalUl = Array.from(document.querySelectorAll('.modal ul'));
    let ulEl = document.querySelector('.modal ul');
    let modalChildren = Array.from(modalUl[0].children);

    for (let i = 0; i < modalChildren.length; i++) {
        ulEl.removeChild(modalChildren[i]);
    }

}

function modalInfo(linksArr) {
    // Modal Query

    let array = linksArr;

    for (let i = 0; i < linksArr.length; i++) {
        linksArr[i].addEventListener("click", () => {

            let anchorName = linksArr[i].dataset.openModal;
            let http = new XMLHttpRequest();

            http.onreadystatechange = () => {
                if (http.status === 200 && http.readyState === 4) {
                    let data = JSON.parse(http.responseText);

                    data.forEach((person) => {
                        if (person.name === anchorName) {
                            console.log(person);

                            let modal = document.querySelector('.modal');
                            let modalTitle = document.querySelector('.modal h1');
                            let modalImg = document.querySelector('.modal img');
                            let modalUl = document.querySelector('.modal ul');

                            let contactInfo = {
                                email: person.email,
                                address: person.address,
                                phoneNumber: person.phone,
                                website: person.website
                            };

                            modalImg.src = person.profilePic;
                            modalTitle.textContent = person.name;
                            modal.classList.add('active');

                            for (let prop in contactInfo) {
                                let li = document.createElement('li');
                                let liInfo = modalUl.appendChild(li);
                                if (prop === 'address') {
                                    console.log(person.address);
                                    liInfo.textContent = `${person.address.street} .St, ${person.address.suite} ${person.address.city}, ${person.address.zipcode}`;
                                } else {
                                    liInfo.textContent = contactInfo[prop];
                                }
                            }
                        }
                    });
                }
            }

            http.open('GET', './users.json', true);
            http.send();


        });
    }
}


function createHtml(data, name, value) {
    this.value = value;
    console.log(data);
    let section = document.createElement('section');
    let anchor = document.createElement('a');
    let anchorInfo = document.createElement('a');
    let span = document.createElement('span');
    let img = document.createElement('img');
    let divName = document.createElement('div');
    let divInfo = document.createElement('div');
    let h3 = document.createElement('h3');
    let ul = document.createElement('ul');
    let randomId = (Math.random() * 9999).toFixed();

    let currentSection = document.querySelector('.show-info-' + this.value).appendChild(section);
    currentSection.id = randomId;
    currentSection.classList.add('data-section');
    currentSection.dataset.section = `${data.name} ${this.value}`; // Add new value here

    let nameSection = currentSection.appendChild(divName);
    nameSection.classList.add('data-section__name');

    let infoSection = currentSection.appendChild(divInfo);
    infoSection.classList.add('data-section__info');

    let sectionAnchor = nameSection.appendChild(anchor);
    anchor.textContent = "X";
    anchor.href = "javascript:void(0)";
    anchor.classList.add('close');

    nameSection.appendChild(h3).textContent = data.name;
    nameSection.appendChild(img).src = data.profilePic;

    let infoUl = infoSection.appendChild(ul);

    let companyInfo = [{
            "Username": data.username
        },
        {
            "Company": data.company.name
        },
        {
            "Occupation": data.company.occupation
        }
    ];

    companyInfo.forEach((listItem) => {
        let li = document.createElement('li');
        let b = document.createElement('b');
        let span = document.createElement('span');

        let generatedLi = infoUl.appendChild(li);

        for (let prop in listItem) {

            let boldDesc = generatedLi.appendChild(b);
            boldDesc.textContent = prop + ": ";

            let value = generatedLi.appendChild(span);
            value.classList.add('light');
            value.textContent = listItem[prop];
        }

    });

    let contactAnchor = infoSection.appendChild(anchorInfo);
    contactAnchor.href = "javascript:void(0)";
    contactAnchor.dataset.openModal = data.name;
    contactAnchor.textContent = "View Contant Info";


    console.log(currentSection);

    getSections();
    modalInfo(currentSection, data);

}

function getSections() {
    sections = Array.from(document.querySelectorAll('[data-section]'));
    removeSections(sections);
}

function removeSections(allSections) {
    allSections.forEach((section) => {
        section.children[0].addEventListener('click', () => {
            section.classList.add('remove');
            setTimeout(() => {
                section.remove();
            }, 300);
        });
    });
}