var md = new Vue({
    el: '#editor',
    data: {
        name: 'new file',
        text: '# flex',
        id: null,
        files: []
    },
    computed: {
        compiledMarkdown: function () {
            return marked(this.text, {sanitize: true})
        }
    },
    created: function() {
        fetch('http://localhost:8000/files',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        }).then(res => res.json())
            .then((files)=>{
                this.files = files;
            })
    },
    methods: {
        update: _.debounce(function (e) {
            this.text = e.target.value
        }, 300),
        openFile: function (id) {
            fetch('http://localhost:8000/file?id=' + id,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                },
            }).then(res => res.json())
                .then((file)=>{
                    this.name = file.title;
                    this.text = file.text;
                    this.id = file._id;
                })
        },
        newFile: function () {
            fetch('http://localhost:8000/create',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body : JSON.stringify({
                    'name' : this.name,
                    'text' : this.text
                })
            }).then(res => res.json())
                .then((id)=>{
                    this.id = id;
                    this.files.push({'_id' : id, 'title' : this.name})
                })
        },
        updateFile: function () {
            fetch('http://localhost:8000/',{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body : JSON.stringify({
                    'name' : this.name,
                    'text' : this.text,
                    'id' : this.id,
                })
            })
        },
        deleteFile : function (id, index) {
            if(id == this.id)
                this.id = null;
            this.files.splice(index, 1);
            fetch('http://localhost:8000/delete',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body : JSON.stringify({
                    'id' : id
                })
            })
        }
    }
});