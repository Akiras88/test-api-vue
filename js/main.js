Vue.component('todo', {
    template: `
        <div class="todo">
            <span>Aggiungi qui i tuoi impegni -></span>
            <input v-on:keyup.enter="saveTodo" v-model="todo" type="text" placeholder="premi invio per aggiungere">
            <div class="todo">
                <h4>Todo:</h4>
                <ul>
                    <li v-for="info in infos" v-bind:key="info.id" class="mt-4">
                        <span class="pr-2">{{ info.text }}</span> 
                        <button v-on:click="deleteTodo(info.id)" type="button" class="btn btn-danger">Delete</button>
                    </li>
                </ul>
            </div>
        </div>        
    `,
    data () {
        return {
            infos: [],
            todo: '',
        }
    },
    methods: {
        getTodo() {
            axios
                .get('http://157.230.17.132:3021/todos')
                .then(response => (this.infos = response.data))
                .catch(error => console.log(error));

        },
        async saveTodo() {
            this.inputValue = this.todo;
            
            const res = await axios
                            .post('http://157.230.17.132:3021/todos', {
                                "text" : this.todo
                            })
                            .then(response => (this.newTodo = response.data))
                            .catch(error => console.log(error))
            this.todo = '';
            this.getTodo();
        },
        deleteTodo(id) {
            axios
                .delete('http://157.230.17.132:3021/todos' + '/' + id)
                .then(response => this.getTodo())
                .catch(error => console.log(error))
        },
        objectSize(infos, numberObj) {
            for (key in infos) {
                numberObj +1;
            }
            console.log(numberObj)
        }

    },
    mounted() {
        this.getTodo()
        },
});



const app = new Vue ({
    el: '#app',
});
