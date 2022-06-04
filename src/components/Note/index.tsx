import styles from './styles.module.css';     
import { RiEdit2Fill } from 'react-icons/ri';
import { FaTrashAlt } from 'react-icons/fa';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/esm/locale';

import { NotesType } from '../../types';


type Props = {
  data: NotesType;
  handleEdit: () => void;
  handleDelete: () => void;
}

export const Note = ({ data, handleEdit, handleDelete }: Props) => {

    return (
        <div className={styles.container}>
          <div className={styles.blockNotes}>
            <div className={styles.blockContent}>
              <div className={styles.blockContentHeader}>
                <h3>{data.title}</h3>
                <time>{format(new Date(data.createdAt), 'dd/MM/yyyy', { locale: ptBR })}</time>
              </div>
              <div className={styles.blockContentBody}>
                <p>{data.body}</p>
                
                <div className={styles.blockContentIcons}>
                    <RiEdit2Fill 
                      size={25} 
                      color="#000"
                      onClick={handleEdit}
                    />
                    <FaTrashAlt 
                      size={25} 
                      color="#ff0000" 
                      onClick={handleDelete}
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}
