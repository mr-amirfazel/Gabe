import { FC, useContext, useEffect, useState} from "react";
import "./index.css";
import { Button } from "@mui/material";
import { addContact } from "../../../services/contact.service";
import { AppContext } from "../../../context/store";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useForm } from "react-hook-form";
// import { Button } from "@mui/material";
// import { AppContext } from "../../../context/store";
// import { CHAT_AXIOS } from "../../../config/config";
// import { UserActionTypes, UserAppState } from "../../../@types/context/context.types";
// import { getUserByUsername } from "../../../services/user.service";

interface AddContactProps extends React.PropsWithChildren {
  onClose: () => void;
  username: string;
}

export const AddContact: FC<AddContactProps> = ({ onClose, username }) => {

    const [isLoading, SetIsLoading] = useState<boolean>(false)

    const {
        state: { user },
    } = useContext(AppContext);

    useEffect(()=>{
        console.log('aliii', user);
        
    },[])

    

    const createContact = () => {
        SetIsLoading(true)
        addContact(user.id, username).then(data => {
            SetIsLoading(false);
            toast.success('Contact added successfully', {
                onClose: () => {
                  onClose()
                }
              });
        }).catch(error => {
            toast.error(error)
        })
    }

  return(
    <div
      className="Addcontact_backdrop w-full h-full flex justify-center items-center "
      onClick={onClose}
    >
      <div
        className="w-1/3 h-[20%] rounded-lg pb-2 text-white Addcontact_modal  flex flex-col items-center justify-around"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2>Do you want to add {username} to your contacts?</h2>
        {isLoading && <p>Loading</p>}
        {!isLoading && 
        <div className="flex w-[90%] justify-between gap-3">
            <Button variant="contained" type="submit" className="flex-1" onClick={() => {createContact()}}>Yes</Button>
            <Button variant="outlined" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
          </div>
        }
      </div>
    </div>
  );
};
