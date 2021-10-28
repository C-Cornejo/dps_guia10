<?php

    Header('Access-Control-Allow-Origin: *');

    Header('Content-Type: application/json; charset=utf-8');

    if($_POST)

    {

        $servername = "localhost";

        $username = "chacc";

        $password = "";

        $dbname = "db_cartera";

        // Crear conexión

        $conn = new mysqli($servername, $username, $password,$dbname);

        // Check connection

        if ($conn->connect_error) {

            die("{'Connection failed': '" . $conn->connect_error ."'}");

        }



        $nombre            =$_POST['nombre'         ];

        $apellido          =$_POST['apellido'       ];

        $postal_personal   =$_POST['postal_personal'];

        $postal_trabajo    =$_POST['postal_trabajo' ];

        $telefono          =$_POST['telefono'       ];

        $correo            =$_POST['correo'         ];

        $nivel_economico   =$_POST['nivel_economico'];

        $intereses         =$_POST['intereses'      ];



       if(!isset($nombre) || !isset($apellido) || !isset($postal_personal) || !isset($postal_trabajo) || !isset($telefono) || !isset($correo)){

                echo "{'error':'No se completaron todos los datos'}";

        }

        else

        {

            $sql = "INSERT INTO `tb_cliente`( `confirmado`, `nombre`, `apellido`, `dir_postal_personal`, `dir_postal_trabajo`, `telefono`, `correo`, `nivel_economico`, `intereses`)

            VALUES (0,'".$nombre."','".$apellido."','".$postal_personal."','".$postal_trabajo."','".$telefono."','".$correo."','".$nivel_economico."','".$intereses."');";

            



            if($conn->query($sql)){

                echo '{"mensaje":"DATA SAVED"}';

            }

            else

            {

                echo '{"error": "' . $sql . ' ' . $conn->error.'"}';

            }

        }// fin de validacion

          

        

        } else

    {

        echo "{'error':'No POST present'}";

    } 



?>