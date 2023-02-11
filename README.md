# evaluativo

This is a project as an evaluation in which technologies are treated as main topics

ReactJS: as a library interface.
Redux: as a library for handling states.
React Router: as a library to handle multiple views and navigate between them.

The context is an ABM of employees.


## Installation

To install this application you need to run the command "npm install"


## Usage

To use this aplication you need to run the command "npm run" 


### Home

This is the main view, in which the employees and the buttons to add (Create) and delete employees are listed. If an employee's row is clicked, the full information will be displayed in another view (ShowEdit).

The list includes a pagination that shows a maximum of 5 employees per page and also search and order filters for each column.


### Create

Here the empty form is shown so that the user can fill in the necessary fields (name, last name, telephone and contract date are required) and then save it. After 3 seconds of waiting, it is automatically redirected to the Main View.


### ShowEdit

In this last view it is used to show all the employee's data and edit it.

For the "show" mode, you can enter by clicking an employee in the main view (Home) or adding the path "/show/<employee id>", in the latter if the id entered is incorrect, a message is displayed error and automatically returns Main View.

The "edit" mode can be used from the "show" mode by clicking the "edit" button to enable all fields or by adding the path "/edit/<employee id>, just like with show, if the employee does not exist, shows an error banner and returns to the Main View automatically.