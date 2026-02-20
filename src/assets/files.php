<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
        <title data-translate="files">Arquivos</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
    </head>
    <body>
        <header id="simb-header" class="p-4">
            <a href="../logotype.html">
                <div class="btn btn-primary"><i class="bi bi-arrow-left"></i>Voltar</div>
            </a>
        </header>
        <section>
            <div class="container">
                <div class="row">
                    <div class="col-md-7 text-center text-md-start d-flex d-sm-flex d-md-flex justify-content-center align-items-center justify-content-md-start align-items-md-center justify-content-xl-center"> 
                        <div> 
                            <h1 class="display-1 text-uppercase fw-light" data-translate="files">Arquivos</h1> 
                            <p class="fs-6 fw-bold my-3" data-translate="graphic_files_for_download">Arquivos gráficos para download</p> 
                            <ul> 
                                <?php
                                    // function to list files in a folder
                                    function listFiles($path) {
                                        // open the folder
                                        if ($handle = opendir($path)) {

                                            // arrays to store file and folder names separately
                                            $files = array();
                                            $folders = array();

                                            // loop to list the files and folders
                                            while (false !== ($entry = readdir($handle))) {

                                                // exclude "." and ".." files
                                                if ($entry != "." && $entry != "..") {
                                                    if (is_file($path . $entry)) {
                                                        $files[] = $entry; 
                                                    } elseif (is_dir($path . $entry)) {
                                                        $folders[] = $entry;
                                                    }
                                                }
                                            }

                                            // sort the files and folders alphabetically
                                            sort($files);
                                            sort($folders);

                                            // loop through the sorted folders first
                                            foreach ($folders as $folder) {
                                                // display the subfolder name with folder icon
                                                echo '<li><i class="bi bi-folder"></i> ' . $folder . '</li>';

                                                // open a sublist for the files in the subfolder
                                                echo '<ul>';

                                                // make a recursive call to list the files in the subfolder
                                                listFiles($path . $folder . '/');

                                                // close the sublist
                                                echo '</ul>';
                                            }

                                            // then loop through the sorted files
                                            foreach ($files as $file) {
                                                $filePath = $path . $file;
                                                $fileExtension = strtolower(pathinfo($file, PATHINFO_EXTENSION));

                                                // Determine if the file is an image
                                                $isImage = in_array($fileExtension, ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']);

                                                echo '<li class="d-flex align-items-center my-1">'; 

                                                // Display thumbnail or icon
                                                if ($isImage) {
                                                    echo '<div class="d-flex justify-content-center align-items-center rounded overflow-hidden me-2" style="width: 80px; height: 80px; background-color:#ececec">'; // Usando classes do Bootstrap
                                                    if ($fileExtension === 'svg') {
                                                        echo '<a href="' . $filePath . '" target="_blank">'; 
                                                        echo '<object data="' . $filePath . '" type="image/svg+xml" width="100%" height="100%">';
                                                        echo '<img src="" alt="' . $file . '">'; // Placeholder or empty image for accessibility
                                                        echo '</object>';
                                                        echo '</a>';
                                                    } else {
                                                        echo '<a href="' . $filePath . '" target="_blank">'; 
                                                        echo '<img src="' . $filePath . '" class="img-fluid" alt="' . $file . '">';
                                                        echo '</a>'; 
                                                    }
                                                    echo '</div>';
                                                } else {
                                                    echo '<a href="' . $filePath . '" target="_blank">'; 

                                                    // Lógica para ícones específicos por extensão
                                                    switch ($fileExtension) {
                                                        case 'pdf':
                                                            echo '<i class="bi bi-file-zip-fill text-danger fs-3 me-2"></i>';  // Usando classes do Bootstrap
                                                            break;
                                                        case 'ase':
                                                        case 'afpalette':
                                                            echo '<i class="bi bi-palette text-dark fs-3 me-2"></i>'; 
                                                            break;
                                                        case 'afpub':
                                                            echo '<i class="bi bi-file-earmark-image fs-3 me-2" style="color:orange"></i>'; 
                                                            break;
                                                        case 'afdesign':
                                                            echo '<i class="bi bi-file-earmark-image fs-3 me-2" style="color:blue"></i>'; 
                                                            break;
                                                        case 'afphoto':
                                                            echo '<i class="bi bi-file-earmark-image fs-3 me-2" style="color:magenta"></i>'; 
                                                            break;
                                                        case 'zip':
                                                            echo '<i class="bi bi-file-zip-fill text-dark fs-3 me-2"></i>'; 
                                                            break;
                                                        default:
                                                            echo '<i class="bi bi-file-earmark fs-3 me-2"></i>'; 
                                                    }

                                                    echo '</a>';
                                                }

                                                // Display file name as a link
                                                echo '<a href="' . $filePath . '" target="_blank">' . $file . '</a>';

                                                echo '</li>';
                                            }

                                            // close the folder
                                            closedir($handle);
                                        }
                                    }

                                    // call the function to list the files
                                    listFiles('files/');
                                ?>
                            </ul>                             
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <footer class="text-center py-4">
            <p>Copyright © Agência Quadri. Developed and created by: Agência Quadri. Autor: Weber Designer</p>
        </footer>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        <script src="assets/js/bs-init.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></script>
    </body>
</html>