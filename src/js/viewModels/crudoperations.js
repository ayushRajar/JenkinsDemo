define([ 
  'knockout', 
  './Models/userController', 
  'ojs/ojarraydataprovider', 
  'ojs/ojtable', 'ojs/ojinputtext', 'ojs/ojformlayout', 'ojs/ojbutton' 
], function (ko, userCollection, ArrayDataProvider) { 
  function CrudoperationsViewModel() { 
    const self = this; 
 
    self.users = userCollection; 
 
    self.id = ko.observable(''); 
    self.name = ko.observable(''); 
    self.email = ko.observable(''); 
 

    self.dataProvider = ko.observable(new ArrayDataProvider([], { keyAttributes: 'id' })); 
    
    self.loadUsers = function () { 
      self.users.fetch({ 
        success: function () { 
          // Extract attributes safely from Backbone/JET Collection models
          const userArray = self.users.map(function (model) { 
            return model.attributes; 
          });
          
          // Update the observable with the new data provider
          self.dataProvider(new ArrayDataProvider(userArray, { keyAttributes: 'id' })); 
        }, 
        error: function () { 
          alert('Failed to load users.'); 
        } 
      }); 
    }; 
 
    self.addUser = function () { 
      const rawId = self.id();
  
      // 1. Safeguard check: make sure the field isn't empty or spacing
      // FIX: Added parentheses () to make trim() execute properly
      if (!rawId || rawId.toString().trim() === '') {
          alert('Please enter a valid ID number');
          return;
      }

      // 2. Convert it safely to a primitive base-10 integer first
      const parsedId = parseInt(rawId, 10);
      if (isNaN(parsedId)) {
        alert('ID must be a clear number');
        return;
      }

      // 3. Move the duplicate check HERE using the cleanly parsed integer ID
      const existingUser = self.users.get(parsedId); 
      if (existingUser) { 
        alert('User with this ID already exists!'); 
        return; 
      }

      // 4. Create the user model with the safe parsed ID variable
      self.users.create({ 
        id: parsedId, 
        name: self.name(), 
        email: self.email() 
      },
      { 
        wait: true, 
        success: function () { 
          self.loadUsers(); 
          alert('User added'); 
          // Clear inputs
          self.id(''); self.name(''); self.email('');
        }, 
        error: function () { 
          alert('Failed to add user'); 
        } 
      });
    }; 
 
    self.updateUser = function () { 
      const user = self.users.get(self.id()); 
      if (user) { 
        user.save({ 
          name: self.name(), 
          email: self.email() 
        }, { 
          patch: true, 
          success: function () { 
            self.loadUsers();
            alert('User updated'); 
          }, 
          error: function () { 
            alert('Update failed'); 
          } 
        }); 
      } else {
        alert('User ID not found to update.');
      }
    }; 
 
    self.deleteUser = function () { 
      const user = self.users.get(self.id()); 
      if (user) { 
        user.destroy({ 
          success: function () { 
            self.loadUsers(); 
            alert('User deleted'); 
            self.id(''); self.name(''); self.email('');
          }, 
          error: function () { 
            alert('Delete failed'); 
          } 
        }); 
      } else {
        alert('User ID not found to delete.');
      }
    }; 
 
    // Kickstart initial load
    self.loadUsers(); 
  } 
 
  // FIX 2: Return the constructor, NOT "new CrudoperationsViewModel()"
  return CrudoperationsViewModel; 
});
