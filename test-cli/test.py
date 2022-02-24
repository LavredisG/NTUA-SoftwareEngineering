import mysql.connector
import os
import unittest

# Class to implement unit tests
class TestStringMethods(unittest.TestCase):

    def test_healthcheck(self):
        os.system("python ../cli/se2131.py healthcheck > .tmp")
        f = open(".tmp", "r")
        self.assertEqual(int(f.read()), 200)
        f.close()
    def test_reset(self):
        os.system("python ../cli/se2131.py resetstations > .tmp")
        f = open(".tmp", "r")
        self.assertEqual(int(f.read()), 200)
        f.close()
        os.system("python ../cli/se2131.py resetvehicles > .tmp")
        f = open(".tmp", "r")
        self.assertEqual(int(f.read()), 200)
        f.close()
        os.system("python ../cli/se2131.py resetpasses > .tmp")
        f = open(".tmp", "r")
        self.assertEqual(int(f.read()), 200)
        f.close()
    def test_passesperstation(self):
        os.system("python ../cli/se2131.py passesperstation --station AO09 --datefrom 20200101 --dateto 20200131 " +
            "--format csv  > .tmp")
        f = open(".tmp", "r")
        self.assertEqual(int(f.read()), 200)
        f.close()
        os.system("python ../cli/se2131.py passesperstation --station AO09 --datefrom 20200101 --dateto 20200131 " +
            "--format wrongformat  > .tmp")
        f = open(".tmp", "r")
        self.assertEqual(int(f.read()), 400)
        f.close()
    def test_passesanalysis(self):
        os.system("python ../cli/se2131.py passesanalysis --op1 kentirki_odos --op2 olympia_odos --datefrom 20200101 " +
            "--dateto 20200131 --format csv  > .tmp")
        f = open(".tmp", "r")
        self.assertEqual(int(f.read()), 200)
        f.close()
        os.system("python ../cli/se2131.py passesanalysis --op1 kentirki_odos --op2 olympias_odos --datefrom 20200101 " +
            "--dateto 20200131 --format wrongformat  > .tmp")
        f = open(".tmp", "r")
        self.assertEqual(int(f.read()), 400)
        f.close()
    def test_passescost(self):
        os.system("python ../cli/se2131.py passescost --op1 olympia_odos --op2 kentriki_odos --datefrom 20200101 " +
            "--dateto 20200131 --format csv  > .tmp")
        f = open(".tmp", "r")
        self.assertEqual(int(f.read()), 200)
        f.close()
        os.system("python ../cli/se2131.py passescost --op1 olympia_odos --op2 kentriki_odos --datefrom 20200101 " +
            "--dateto 20200131 --format wrongformat  > .tmp")
        f = open(".tmp", "r")
        self.assertEqual(int(f.read()), 400)
        f.close()
    def test_chargesby(self):
        os.system("python ../cli/se2131.py chargesby --op1 kentriki_odos --datefrom 20201001 --dateto 20201031 " +
            "--format csv > .tmp")
        f = open(".tmp", "r")
        self.assertEqual(int(f.read()), 200)
        f.close()
        os.system("python ../cli/se2131.py chargesby --op1 kentriki_odos --datefrom 20201001 " +
            "--dateto 20201031 --format wrongformat  > .tmp")
        f = open(".tmp", "r")
        self.assertEqual(int(f.read()), 400)
        f.close()
    def test_admin(self):
        # Insert and then delete dummy data
        os.system("python ../cli/se2131.py admin --passesupd --source sample_pass.csv > .tmp")
        try:
            connection =  mysql.connector.connect(
                host="localhost",
                user="root",
                password="panoplos",
                database="softeng2131"
            )
        except mysql.connector.Error as e:
            print(e)
        cursor = connection.cursor()
        cursor.execute("DELETE FROM passes where passID = 'WSI3219900'")
        connection.commit()
        cursor.close()
        connection.close()

        f = open(".tmp", "r")
        self.assertEqual(int(f.read()), 200)
        f.close()
        os.system("python ../cli/se2131.py admin --passesupd --source 0246236788.csv > .tmp")
        f = open(".tmp", "r")
        self.assertEqual(int(f.read()), 400)
        f.close()

if __name__ == '__main__':
    unittest.main() # simply call all tests
