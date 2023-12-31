const app = Vue.createApp({
    data(){
        return {
            search : "",
            users : [],
              newUser: { name: '', email: '', rent: '', district: '', age: '' },
                    showAddForm: true,
                    editingIndex: -1,
        };
    },

    methods: {
      async fetchUsers(){
        try{
          const response = await fetch('users.json');
          this.users = await response.json();
        }catch(err){
          console.error('Error fetching users :', err);
        }
      },
      deleteUser(index) {
          this.users.splice(index, 1);
      },
      editUser(index) {
          this.newUser = { ...this.users[index] };
          this.showAddForm = true;
          this.editingIndex = index;
      },
      showAddForm() {
          this.showAddForm = true;
          this.editingIndex = -1;
          this.newUser = { name: '', email: '', rent: '', district: '', age: '' };
      },
      addUser() {
          if (this.editingIndex > -1) {
              this.users.splice(this.editingIndex, 1, { ...this.newUser });
          } else {
              this.users.push({ ...this.newUser });
          }

          this.newUser = { name: '', email: '', rent: '', district: '', age: '' };
          this.showAddForm = true;
          this.editingIndex = -1;
      },
      cancelEdit() {
          this.newUser = { Name: '', Email: '', Rent: '', District: '', Age: '' };
          this.showAddForm = true;
          this.editingIndex = -1;
      },
      
  },
  computed : {
    itemCount(){
          return  this.filteredList.length;
    },
    filteredList(){
          return this.users.filter(user =>
            user.name.toLowerCase().includes(this.search.toLowerCase()) ||
            user.email.toLowerCase().includes(this.search.toLowerCase()) ||
            user.district.toLowerCase().includes(this.search.toLowerCase())
        );
    }
   
  },
  mounted(){
    this.fetchUsers();
  },
}).mount("#app");