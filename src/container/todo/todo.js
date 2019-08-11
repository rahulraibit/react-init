import React, { Component, Fragment } from "react";
import clsx from 'clsx';
import {
    withStyles,
    Grid,
    TextField,
    Icon,
    Button,
    Fab
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from '@material-ui/icons/Add';
import ACTIONS from "./todoAction";
import { connect } from "react-redux";
import SaveIcon from '@material-ui/icons/Save';

const styles = theme => ({
    fab: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    }
});

class ToDO extends Component {
    constructor(props) {
        super(props)
        this.state = { 'item': '', activeEditIndex: -1, editItemValue: '' };

    }

    handleSubmit = event => {
        // console.log(this.state.item);
        this.setState({ item: "" });
        if (this.state.item !== "") {
            // add the item to the store
            this.props.createItem(this.state.item);
        }
        event.preventDefault();
    };

    handleDelete = (item, event) => {
        // delete the item from the store
        console.log(item);
        this.props.deleteItem(item.id);
    };

    handleEdit = (item, event) => {
        this.setState({ activeEditIndex: item.id, editItemValue: item.description })
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleEditSave = event => {
        this.setState({ editItemValue: "", activeEditIndex: -1 });
        if (this.state.editItemValue !== "") {
            // add the item to the store
            this.props.editItem({ description: this.state.editItemValue, id: this.state.activeEditIndex });
        }
        event.preventDefault();
    }

    handleEditChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        const { classes } = this.props;

        return (
            <main>
                <center>
                    <form noValidate autoComplete="off" >
                        <Grid container>
                            <Grid item xs={11}>
                                <TextField
                                    label="New Task"
                                    fullWidth={true}
                                    id="margin-dense"
                                    value={this.state.item}
                                    className={classes.textField}
                                    name="item"
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <Fab color="primary" aria-label="add" className={classes.fab}>
                                    <AddIcon onClick={this.handleSubmit} />
                                </Fab>
                            </Grid>
                        </Grid>
                    </form>
                    <br />
                    <h2 style={{ textAlign: "initial" }}>{"List Of Task"}</h2>
                    <Grid container justify="center" alignItems="center" spacing={3}>
                        {this.props.items.map((item, i) => (
                            <Fragment key={i}>
                                <Grid item xs={12} sm={10}>
                                    {
                                        this.state.activeEditIndex == item.id ?
                                            <TextField
                                                label="Update Task"
                                                fullWidth={true}
                                                id="margin-dense"
                                                value={this.state.editItemValue}
                                                className={classes.textField}
                                                name="editItemValue"
                                                onChange={this.handleEditChange}
                                            /> :
                                            <div className="description">{item.description}</div>
                                    }
                                </Grid>
                                <Grid container item xs={12} sm={2} justify="flex-start">
                                    {
                                        this.state.activeEditIndex == item.id ?
                                            <Button color="primary" variant="contained" size="small" onClick={this.handleEditSave}
                                                className={classes.button}>
                                                <SaveIcon className={clsx(classes.leftIcon, classes.iconSmall)} />
                                                Save
                                             </Button> :
                                            <Fab color="secondary" aria-label="edit" onClick={(e) => this.handleEdit(item, e)} className={classes.fab}>
                                                <Icon>edit_icon</Icon>
                                            </Fab>
                                    }
                                    <Fab aria-label="delete" onClick={this.handleDelete.bind(this, item)} className={classes.fab}>
                                        <DeleteIcon />
                                    </Fab>
                                </Grid>
                            </Fragment>
                        ))
                        }
                    </Grid>
                </center>
            </main>
        );
    }
}

const mapStateToProps = state => ({
    items: state.todoReducer.items
});

const mapDispatchToProps = dispatch => ({
    createItem: item => dispatch(ACTIONS.createItem(item)),
    deleteItem: id => dispatch(ACTIONS.deleteItem(id)),
    editItem: item => dispatch(ACTIONS.editItem(item))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ToDO));
