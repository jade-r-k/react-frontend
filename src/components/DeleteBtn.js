import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from '../config';

const DeleteBtn = (props) => {

    const onDelete = () => {
        let token = localStorage.getItem('token');
        //confirm to delete
        if (window.confirm("Do you want to delete this restaurant?")){
            //delete restaurant
            axios.delete(`/${props.resource}/${props.id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
             .then((response) => {
                 console.log(response.data);

                props.callback(props.id);
                 
             })
             .catch((err) => {
                // props.callback(props.id);
                 console.error(err);
                 console.log(err.response.data.message);

             });
        };
    };

    return (
        //delete button
        <Button 
            startIcon={<DeleteIcon />}
            variant='outlined'
            color='error'
            onClick={onDelete}
        >
            Delete
        </Button>
    );
};

export default DeleteBtn;