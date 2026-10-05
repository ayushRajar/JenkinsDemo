define([
  '../accUtils',
  'knockout',
  'ojs/ojformlayout',
  'oj-c/input-text',
  'ojs/ojdatetimepicker',
  'ojs/ojconverter-datetime',
  'ojs/ojvalidator-length'
], function (
  accUtils,
  ko,
  ojformlayout,
  ojcInputText,
  ojdatetimepicker,
  DateTimeConverter,
  LengthValidator
) {

  function DashboardViewModel() {

    var self = this;

    this.birthDate = ko.observable();

    this.name = ko.observable("Mitnick");

    this.dateConverter =
      new DateTimeConverter.IntlDateTimeConverter({
        pattern: "MM/dd/yyyy"
      });

    this.lengthValidator = [
      new LengthValidator({
        min: 3,
        max: 10,
        hint: {
          inRange: "Enter between 3 and 10 characters"
        }
      })
    ];

    this.connected = () => {
      accUtils.announce(
        'Dashboard page loaded.',
        'assertive'
      );

      document.title = "Dashboard";
    };

    this.disconnected = () => {
    };

    this.transitionCompleted = () => {
    };
  }

  return DashboardViewModel;
});
