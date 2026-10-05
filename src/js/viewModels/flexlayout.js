define([
  "knockout",
  "ojs/ojarraydataprovider",
  "ojs/ojchart",
  "ojs/ojselectsingle"
], function (ko, ArrayDataProvider) {

  function ViewModel() {

    var self = this;

    self.activities = [
      { id: 1, name: "Baseball" },
      { id: 2, name: "Soccer" },
      { id: 3, name: "Basketball" },
      { id: 4, name: "Football" }
    ];

    self.activityDataProvider =
      new ArrayDataProvider(
        self.activities,
        {
          keyAttributes: "id"
        }
      );


    self.chartTypes = [
      { value: "bar", label: "Bar" },
      { value: "line", label: "Line" },
      { value: "pie", label: "Pie" }
    ];

    self.chartTypesDP =
      new ArrayDataProvider(
        self.chartTypes,
        {
          keyAttributes: "value"
        }
      );


    self.val = ko.observable("bar");


    self.chartData = [
      {
        id: 1,
        series: "Sales",
        group: "Q1",
        value: 25
      },
      {
        id: 2,
        series: "Sales",
        group: "Q2",
        value: 40
      },
      {
        id: 3,
        series: "Sales",
        group: "Q3",
        value: 35
      },
      {
        id: 4,
        series: "Sales",
        group: "Q4",
        value: 50
      }
    ];


    self.chartDataProvider =
      new ArrayDataProvider(
        self.chartData,
        {
          keyAttributes: "id"
        }
      );

  }

  return ViewModel;
});
