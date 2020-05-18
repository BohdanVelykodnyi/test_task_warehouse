import React from "react";
import axios from "axios"
import "../index.css"

export class AddKey extends React.Component{
    constructor() {
        super();
        this.state = {
            key: "",
            warehouse: null,
            my_keys: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            key: event.target.value
        });
        console.log(this.state.key)
    }

    addNewKey = warehouse =>{
        this.setState({
            warehouse: warehouse
        });

        axios.post('api/add_key', {
            key: this.state.key,
            warehouse: Number(warehouse)
        })
            .then(() => {
                this.myKeys();
            })
            .catch = ((error) => {
                console.log(error);
            });

    };

    swipeWarehouse = (number, key) =>{
        axios.put('api/swipe_key', {
            key: key,
            warehouse: number
        })
            .then(() => {
                this.myKeys();
            })
            .catch = ((error) => {
            console.log(error);
        });
    };

    myKeys = () => {
        axios.get('api/my_keys')
            .then((response) => {
                console.log(response.data.your_keys);
                this.setState({
                    my_keys: response.data.your_keys
                })
            })
            .catch = ((error) => {
            console.log(error);
        });
    };

    componentDidMount() {
        this.myKeys()
    }

    render() {
        return (
            <div>
                <form>
                    <input value={this.state.key} onChange={this.handleChange} placeholder={"Введіть ключ"}/>
                    <button onClick={() =>this.addNewKey(1)}>Добавити на 1 склад</button>
                    <button onClick={() =>this.addNewKey(2)}>Добавити на 2 склад</button>
                    <button onClick={() =>this.addNewKey(3)}>Добавити на 3 склад</button>
                </form>

                <div className={"warehouses"}>
                    <div className={"warehouse"}>
                        <span>1 cклад:</span>
                        <div>
                            {this.state.my_keys ? this.state.my_keys.map((key, num) =>{
                                if(key.warehouse === 1){
                                    return <div key={num}>
                                                <span className={"key"}>{key.key}</span>
                                                <button onClick={() =>this.swipeWarehouse(2, key.key)}>На cклад 2</button>
                                                <button onClick={() =>this.swipeWarehouse(3, key.key)}>На cклад 3</button>
                                           </div>
                                }

                            })
                            :null}
                        </div>
                    </div>

                    <div className={"warehouse"}>
                        <span>2 cклад:</span>
                        <div>
                            {this.state.my_keys ? this.state.my_keys.map((key, num) =>{
                                    if(key.warehouse === 2){
                                        return <div key={num}>
                                                    <span className={"key"}>{key.key}</span>
                                                    <button onClick={() =>this.swipeWarehouse(1, key.key)}>На cклад 1</button>
                                                    <button onClick={() =>this.swipeWarehouse(3, key.key)}>На cклад 3</button>
                                                </div>
                                    }

                                })
                                :null}
                        </div>
                    </div>

                    <div className={"warehouse"}>
                        <span>3 cклад:</span>
                        <div>
                            {this.state.my_keys ? this.state.my_keys.map((key, num) =>{
                                    if(key.warehouse === 3){
                                        return <div key={num}>
                                                    <span className={"key"}>{key.key}</span>
                                                    <button onClick={() =>this.swipeWarehouse(1, key.key)}>На cклад 1</button>
                                                    <button onClick={() =>this.swipeWarehouse(2, key.key)}>На cклад 2</button>
                                                </div>
                                    }

                                })
                                :null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}