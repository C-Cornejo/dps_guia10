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



        $usuario=$_POST["usuario"];

        $clave = $_POST["clave"];

        $sql="SELECT * FROM tb_ingreso WHERE usuario='".$usuario."' AND clave = '".$clave."';";

        $result = $conn->query($sql);

        if($result){

            if ($result->num_rows == 1) {

            echo '{"mensaje":"ACCESS GRANTED"}';

        }

        elseif($result->num_rows == 0) {

            echo '{"error": "' . $sql . ' ' . $conn->error.'"}';

        }

        else

        {

            echo '{"error": "' . $sql . ' ' . $conn->error.'"}';

        }

        }

        else

        {

             echo '{"error": "' . $sql . ' ' . $conn->error.'"}';

        }

    }

    elseif(isset($_GET['get']))

    {

        if($_GET['get'] == 1)

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

            $sql = "SELECT * FROM `tb_cliente` WHERE confirmado = 0;";



            $result = $conn->query($sql);

            if ($result->num_rows > 0) {

            // obtener cada uno de los registros y almacenarlos en un vector y luego regresarlos en formato json

                $registros=array();

                $i=0;

            while($row = $result->fetch_assoc()) {

            //echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " .

        // $row["lastname"]. "<br>";

            $registros[$i]=$row; $i++;

            }

            echo '{"records":'.json_encode($registros).'}';

            } else {

            echo '{"records":[]}';

            }

        }

        elseif ($_GET['get'] == 10)

        {

            $servername = "localhost";

            $username = "id17788431_chacc";

            $password = "";

            $dbname = "db_cartera";

            // Crear conexión

            $conn = new mysqli($servername, $username, $password,$dbname);

            // Check connection

            if ($conn->connect_error) {

                die("{'Connection failed': '" . $conn->connect_error ."'}");

            }

            $sql = "SELECT * FROM `tb_cliente` WHERE confirmado = 1;";



            $result = $conn->query($sql);

            if ($result->num_rows > 0) {

            // obtener cada uno de los registros y almacenarlos en un vector y luego regresarlos en formato json

                $registros=array();

                $i=0;

            while($row = $result->fetch_assoc()) {

            //echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " .

        // $row["lastname"]. "<br>";

            $registros[$i]=$row; $i++;

            }

            echo '{"records":'.json_encode($registros).'}';

            } else {

            echo '{"records":[]}';

            }

        }elseif($_GET['get']== 20)

        {

            $id         = $_GET['id'];

            $servername = "localhost";

            $username   = "chacc";

            $password   = "";

            $dbname     = "db_cartera";

            // Crear conexión

            $conn = new mysqli($servername, $username, $password,$dbname);

            // Check connection

            if ($conn->connect_error) {

                die("{'Connection failed': '" . $conn->connect_error ."'}");

            }

            $sql = "SELECT * FROM `tb_cliente` WHERE id = '".$id."';";



            $result = $conn->query($sql);

            if ($result->num_rows > 0) {

            // obtener cada uno de los registros y almacenarlos en un vector y luego regresarlos en formato json

                $registros=array();

                $i=0;

            while($row = $result->fetch_assoc()) {

            //echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " .

        // $row["lastname"]. "<br>";

            $registros[$i]=$row; $i++;

            }

            echo '{"records":'.json_encode($registros).'}';

            } else {

            echo '{"records":[]}';

            }

        }

    }

    

?>