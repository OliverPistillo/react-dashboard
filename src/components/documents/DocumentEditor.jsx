// src/components/documents/DocumentEditor.jsx
import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Divider, IconButton, Tooltip, TextField, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { saveDocument, updateDocument } from '../../store/slices/documentSlice';

const DocumentEditor = ({ documentId }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentDocId = documentId || id;
  
  const { documents } = useSelector((state) => state.documents);
  const { currentUser } = useSelector((state) => state.auth);
  
  const currentDocument = documents.find(doc => doc.id === currentDocId);
  
  const [title, setTitle] = useState(currentDocument?.title || 'Nuovo documento');
  const [content, setContent] = useState(currentDocument?.content || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(!currentDocument);
  
  // Moduli e formati per ReactQuill
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }]
    ],
  };
  
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'color', 'background',
    'align'
  ];
  
  // Gestisce il salvataggio del documento
  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      const documentData = {
        title,
        content,
        lastModified: new Date().toISOString(),
        lastModifiedBy: currentUser.id
      };
      
      if (currentDocument) {
        await dispatch(updateDocument({ 
          id: currentDocId, 
          ...documentData 
        }));
      } else {
        await dispatch(saveDocument({
          ...documentData,
          createdAt: new Date().toISOString(),
          createdBy: currentUser.id,
          projectId: window.location.pathname.includes('projects/') ? 
            window.location.pathname.split('/')[2] : null
        }));
      }
      
      setIsEditing(false);
    } catch (error) {
      console.error('Errore durante il salvataggio del documento:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  // Gestisce l'attivazione della modalità di modifica
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ 
        p: 2, 
        mb: 2, 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {isEditing ? (
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Titolo del documento"
            sx={{ mr: 2 }}
          />
        ) : (
          <Typography variant="h5" fontWeight="bold">
            {title}
          </Typography>
        )}
        
        <Box>
          {isEditing ? (
            <>
              <Tooltip title="Annulla">
                <IconButton onClick={() => setIsEditing(false)} disabled={!currentDocument}>
                  <UndoIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Salva">
                <IconButton onClick={handleSave} disabled={isSaving}>
                  <SaveIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <Button 
              variant="outlined" 
              startIcon={<CloudUploadIcon />} 
              onClick={handleEdit}
            >
              Modifica
            </Button>
          )}
        </Box>
      </Paper>
      
      <Paper sx={{ 
        p: 2, 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden'
      }}>
        {isEditing ? (
          <Box sx={{ flexGrow: 1, '& .quill': { height: '100%' } }}>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              placeholder="Scrivi il contenuto del documento qui..."
              style={{ height: 'calc(100% - 42px)' }} // Altezza della toolbar
            />
          </Box>
        ) : (
          <Box sx={{ 
            overflow: 'auto', 
            flexGrow: 1,
            '& .ql-editor': { padding: 0 }, 
          }}>
            <div 
              className="ql-editor" 
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </Box>
        )}
        
        {!isEditing && currentDocument && (
          <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="caption" color="text.secondary">
              Ultima modifica: {new Date(currentDocument.lastModified).toLocaleString('it-IT')} da {currentDocument.lastModifiedByName}
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};
