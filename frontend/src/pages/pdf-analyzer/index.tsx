import { useRef, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

type UploadStatus = 'idle' | 'selected' | 'uploading' | 'success' | 'error';

export default function PdfUploadPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    if (selectedFile.type !== 'application/pdf') {
      setFile(null);
      setStatus('error');
      setError('Only PDF files are allowed.');
      return;
    }

    setFile(selectedFile);
    setStatus('selected');
    setError(null);
  }

  async function handleUpload() {
    if (!file) return;

    setStatus('uploading');
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:7777/api/documents/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed.');
      }

      setStatus('success');
    } catch {
      setStatus('error');
      setError('Could not upload the PDF.');
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            PDF Upload
          </Typography>

          <Typography color="text.secondary">
            Upload a PDF document to start the automation workflow.
          </Typography>
        </Box>

        <Card variant="outlined">
          <CardContent>
            <Stack spacing={3}>
              <Box
                onClick={() => inputRef.current?.click()}
                sx={{
                  border: '2px dashed',
                  borderColor: 'divider',
                  borderRadius: 2,
                  p: 6,
                  textAlign: 'center',
                  cursor: 'pointer',
                  bgcolor: 'background.default',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="application/pdf"
                  hidden
                  onChange={handleFileChange}
                />

                <CloudUploadIcon color="primary" sx={{ fontSize: 56, mb: 2 }} />

                <Typography variant="h6">
                  Click to select a PDF file
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Only .pdf files are supported
                </Typography>
              </Box>

              {file && (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={2}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <PictureAsPdfIcon color="error" />

                    <Box>
                      <Typography fontWeight={600}>
                        {file.name}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </Typography>
                    </Box>
                  </Stack>

                  <Chip label={status} color={status === 'success' ? 'success' : 'default'} />
                </Stack>
              )}

              {status === 'uploading' && <LinearProgress />}

              {error && (
                <Alert severity="error">
                  {error}
                </Alert>
              )}

              {status === 'success' && (
                <Alert severity="success">
                  PDF uploaded successfully. Automation workflow started.
                </Alert>
              )}

              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  disabled={!file || status === 'uploading'}
                  onClick={() => {
                    setFile(null);
                    setStatus('idle');
                    setError(null);
                  }}
                >
                  Clear
                </Button>

                <Button
                  variant="contained"
                  disabled={!file || status === 'uploading'}
                  onClick={handleUpload}
                >
                  Upload PDF
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}