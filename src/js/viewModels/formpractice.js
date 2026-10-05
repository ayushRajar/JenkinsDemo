define([
    'knockout',
    'ojs/ojcore',
    'ojs/ojknockout',
    'ojs/ojinputtext',
    'ojs/ojformlayout',
    'ojs/ojselectsingle',
    'ojs/ojradioset',
    'ojs/ojarraydataprovider',
    'ojs/ojcheckboxset'
], function(ko, oj, ojknockout, ojinputtext, ojformlayout, ojselectsingle, ojradioset, ArrayDataProvider) {

    function FormPracticeViewModel() {

        this.Name = ko.observable('');
        this.email = ko.observable('');

        this.selectCountry = ko.observable('');

        this.countryList = ko.observableArray([
            { value: 'USA', label: 'United States' },
            { value: 'CAN', label: 'Canada' },
            { value: 'MEX', label: 'Mexico' }
        ]);

        this.countryListDataProvider =
            new ArrayDataProvider(this.countryList, {
                keyAttributes: 'value'
            });

        this.gender = ko.observable('');

        this.hobbies = ko.observableArray([]);

        this.formSubmitted = ko.observable(false);
        this.submittedData = ko.observable({});

        this.handleSubmit =() =>{
            const data = {
                Name:this.Name(),
                Email:this.email(),
                Country:this.selectCountry(),
                Gender:this.gender(),
                Hobbies:this.hobbies()
            };
            console.log("Form Submitted");
            this.submittedData(data);
            this.formSubmitted(true);

        }
    }

    return FormPracticeViewModel;
});
