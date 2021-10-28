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

    

    $id                =$_POST['id'];

    $nombre            =$_POST['nombre'];

    $apellido          =$_POST['apellido'];

    $postal_personal   =$_POST['postal_personal'];

    $postal_trabajo    =$_POST['postal_trabajo'];

    $telefono          =$_POST['telefono'];

    $correo            =$_POST['correo'];

    $nivel_economico   =$_POST['nivel_economico'];

    $intereses         =$_POST['intereses'];



    if(!isset($nombre) || !isset($apellido) || !isset($postal_personal) || !isset($postal_trabajo) || !isset($telefono) || !isset($correo)){

            echo "{'error':'No se completaron todos los datos'}";

    }

    else

    {

        $sql = "UPDATE `tb_cliente` SET `nombre`= '".$nombre."', `apellido` = '".$apellido."', `dir_postal_personal` = '".$postal_personal."', `dir_postal_trabajo` = '".$postal_trabajo."', `telefono` = '".$telefono."', `correo`= '".$correo."', `nivel_economico`='".$nivel_economico."', `intereses`= '".$intereses."' WHERE id = ".$id.";";

        



        if($conn->query($sql)){

            echo '{"mensaje":"DATA SAVED"}';

        }

        else

        {

            echo '{"error": "' . $sql . ' ' . $conn->error.'"}';

        }

    }// fin de validacion

}

else

{

    echo "{'error':'No POST present'}";

}

?>