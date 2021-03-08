function Students(selector){
    this.students =[
        {firstname: 'Maxim', estimate: 4, course: 1, is_active: true},
        {firstname: 'Ivan', estimate: 3, course: 2, is_active: true},
        {firstname: 'Andrei', estimate: 7, course: 2, is_active: true},
        {firstname: 'Ilia', estimate: 5, course: 2, is_active: true},
        {firstname: 'Dmytro', estimate: 4, course: 3, is_active: true},
        {firstname: 'Valera', estimate: 3, course: 1, is_active: true},
        {firstname: 'Andrei', estimate: 2, course: 2, is_active: false},
        {firstname: 'Lena', estimate: 2, course: 4, is_active: false},
    ];

    this.container = document.querySelector(selector);
    this.table = this.container.querySelector("table tbody");
    this.createButton = this.container.querySelector('form [type="submit"]');
}

Students.prototype.init = function(){
    this.render();
    this.createButton.addEventListener("click", this.eventAddStudent.bind(this));
};

Students.prototype.render = function(){
    this.table.innerHTML = "";

    for(let i = 0; i < this.students.length; i++){
        let tr = document.createElement("TR");
        tr.setAttribute("data-index", i);
        tr.style.background = this.getColor(this.students[i].estimate);
        

        let tdFio = document.createElement("TD");
        tdFio.innerHTML = this.students[i].firstname;
        tdFio.addEventListener("click", this.eventChangeFirstname.bind(this));
        tr.appendChild(tdFio);

        let tdCourse = document.createElement("TD");
        tdCourse.innerHTML = this.students[i].course;
        tdCourse.addEventListener("click", this.eventChangeCourse.bind(this));
        tr.appendChild(tdCourse);

        let tdEstimate = document.createElement("TD");
        tdEstimate.innerHTML = this.students[i].estimate;
        tdEstimate.addEventListener("click", this.eventChangeEstimate.bind(this));
        tr.appendChild(tdEstimate);

        let tdActive = document.createElement("TD");
        let checkbox = document.createElement("INPUT");
        checkbox.type = "checkbox";
        checkbox.checked = this.students[i].is_active;
        checkbox.addEventListener("change", this.eventChangeStatus.bind(this));
        tdActive.appendChild(checkbox);
        tr.appendChild(tdActive);

        let buttonDel = document.createElement('BUTTON');
        buttonDel.innerHTML = "X";
        buttonDel.addEventListener("click", this.eventRemove.bind(this));
        tr.appendChild(buttonDel);

        this.table.appendChild(tr);
    }

    this.getDataOfStudEstimate();
};

Students.prototype.eventAddStudent = function(event){
    event.preventDefault();

    let form = event.target.closest("form");
    let formData = new FormData(form);
    
    let student = {
        firstname: formData.get("firstname"),
        estimate: Number(formData.get("estimate")),
        course: Number(formData.get("course")),
        is_active: formData.get("is_active") !== null,
    };

    
    this.students.push(student);
    this.render();
};

Students.prototype.eventRemove = function(event){
    let tr = event.target.closest("tr");
    let index = parseInt(tr.getAttribute("data-index"));
    this.students.splice(index, 1);

    if(this.students.length === 0){
        this.table.innerHTML = "";
        let noStud = document.createElement('LABEL');
        noStud.innerHTML = 'Students not found.';
        this.table.appendChild(noStud);
    }else{
        this.render();
    }
};

Students.prototype.getColor = function(estimate){
    if(estimate < 3){
        return 'red';
    }else if(estimate < 4){
        return 'yellow';
    }else{
        return 'green';
    }

};

Students.prototype.eventChangeFirstname = function(event){
    let td = event.target;
    tr = td.closest("tr");

    td.innerHTML = "";
    let input = document.createElement("INPUT");
    input.type = "text";

    input.addEventListener("keyup", this.eventNewFirstname.bind(this));
    input.addEventListener("blur", this.eventBlurNewFirstname.bind(this));

    td.appendChild(input);
    input.focus();
};

Students.prototype.eventNewFirstname = function(event){
    event.preventDefault();

    let self = this;
    if(event.keyCode === 13){
        event.target.removeEventListener("blur", this.eventBlurNewFirstname.bind(this));
        let firstname = event.target.value;

        let tr = event.target.closest("tr");
        let index = tr.getAttribute("data-index");

        let student = {
            firstname: firstname,
            course: self.students[index].course,
            estimate: self.students[index].estimate,
            is_active: self.students[index].is_active,
        };

        tr.innerHTML = student;
        self.students[index] = student;
        this.render();
    }
};

Students.prototype.eventBlurNewFirstname = function(event){
    event.preventDefault();

    let tr = event.target.closest("tr");
    let td = event.target.closest("td");
    let index = tr.getAttribute("data-index");
    
    td.innerHTML = this.students[index].firstname;
};

Students.prototype.eventChangeCourse = function(event){
    let td = event.target;
    tr = td.closest("tr");

    td.innerHTML = "";
    let input = document.createElement("INPUT");
    input.type = "number";

    input.addEventListener("keyup", this.eventNewCourse.bind(this));
    input.addEventListener("blur", this.eventBlurNewCourse.bind(this));

    td.appendChild(input);
    input.focus();
};

Students.prototype.eventNewCourse = function(event){
    event.preventDefault();

    let self = this;
    if(event.keyCode === 13){
        event.target.removeEventListener("blur", this.eventBlurNewFirstname.bind(this));
        let course = Number(event.target.value);

        let tr = event.target.closest("tr");
        let index = tr.getAttribute("data-index");

        let student = {
            firstname: self.students[index].firstname,
            course: course,
            estimate: self.students[index].estimate,
            is_active: self.students[index].is_active,
        };

        tr.innerHTML = student;
        self.students[index] = student;
        this.render();
    }
};

Students.prototype.eventBlurNewCourse = function(event){
    event.preventDefault();

    let tr = event.target.closest("tr");
    let td = event.target.closest("td");
    let index = tr.getAttribute("data-index");
    
    td.innerHTML = this.students[index].course;
};

Students.prototype.eventChangeEstimate = function(event){
    let td = event.target;
    tr = td.closest("tr");

    td.innerHTML = "";
    let input = document.createElement("INPUT");
    input.type = "number";

    input.addEventListener("keyup", this.eventNewEstimate.bind(this));
    input.addEventListener("blur", this.eventBlurNewEstimate.bind(this));

    td.appendChild(input);
    input.focus();
};


Students.prototype.eventNewEstimate = function(event){
    event.preventDefault();

    let self = this;
    if(event.keyCode === 13){
        event.target.removeEventListener("blur", this.eventBlurNewFirstname.bind(this));
        let estimate = Number(event.target.value);

        let tr = event.target.closest("tr");
        let index = tr.getAttribute("data-index");

        let student = {
            firstname: self.students[index].firstname,
            course: self.students[index].course,
            estimate: estimate,
            is_active: self.students[index].is_active,
        };

        tr.innerHTML = student;
        self.students[index] = student;
        this.render();
    }
};

Students.prototype.eventBlurNewEstimate = function(event){
    event.preventDefault();

    let tr = event.target.closest("tr");
    let td = event.target.closest("td");
    let index = tr.getAttribute("data-index");
    
    td.innerHTML = this.students[index].estimate;
};

Students.prototype.eventChangeStatus = function(event){
    let tr = event.target.closest("tr");
    let index = parseInt(tr.getAttribute("data-index"));
    this.students[index].is_active = event.target.checked;
    
    this.render();
};

Students.prototype.getDataOfStudEstimate = function(){
    let courses = {}; 
    courses.countOfAllNotActiveStud = 0;

    for(let student of this.students){
        if(courses[student.course] === undefined){
            courses[student.course] = {
                countOfActivStud: 0,
                estimate: 0,
                countOfNotActiveStud: 0,
            };
        }

        if(student.is_active){
            courses[student.course].estimate += student.estimate;
            courses[student.course].countOfActivStud ++;
            continue;
        }

        courses[student.course].countOfNotActiveStud++;
        courses.countOfAllNotActiveStud++;
    }
    
    for(let course in courses){
        if( courses[course].countOfActivStud === 0){
            courses[course].avgEstimate = 0;
            continue;
        }
        courses[course].avgEstimate = courses[course].estimate / courses[course].countOfActivStud;
    }

    this.renderDataOfStudEstimate(courses);
};

Students.prototype.renderDataOfStudEstimate = function(courses){
    let container = document.querySelector('.avgEstimate');
    let table = container.querySelector('table tbody');
    table.innerHTML = "";

    for(let course in courses){
        if(courses[course] === courses.countOfAllNotActiveStud){
            continue;
        }

        let trAvgEstimate = document.createElement("TR");
        trAvgEstimate.style.background = this.getColor(courses[course].avgEstimate);

        let tdCourse = document.createElement("TD");
        tdCourse.innerHTML = course;
        trAvgEstimate.appendChild(tdCourse);

        let tdCountOfStud = document.createElement("TD");
        tdCountOfStud.innerHTML = courses[course].countOfActivStud;
        trAvgEstimate.appendChild(tdCountOfStud);

        let tdAvgEstimate = document.createElement("TD");
        tdAvgEstimate.innerHTML = courses[course].avgEstimate;
        trAvgEstimate.appendChild(tdAvgEstimate);

        let tdNotActivStud = document.createElement("TD");
        tdNotActivStud.innerHTML = courses[course].countOfNotActiveStud;
        trAvgEstimate.appendChild(tdNotActivStud);


        table.appendChild(trAvgEstimate);
    }

    let allNotActiveStud = document.createElement('LABEL');
    allNotActiveStud.innerHTML = 'Общее количество не активных студентов: ' + courses.countOfAllNotActiveStud;
    table.appendChild(allNotActiveStud);
};








window.onload = function(){
    (new Students(".students")).init();
}