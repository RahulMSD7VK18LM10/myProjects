import csv

def insert():
    roll=input("Enter Roll No: ")
    name=input("Enter Name of Student: ")
    fname=input("Enter Name of Student's Father: ")
    mname=input("Enter Name of Student's Mother: ")
    mobile=input("Enter Student Contact Number: ")
    clas=input("Enter class of student: ")
    lst=[roll,name,fname,mname,mobile,clas]
    fh=open("Student.txt","a")
    fh.writelines(str(lst))
    print("Record inserted Successfully")
    fh.close()

def delete():
    roll=int(input("Enter roll no that is to be deleted: "))
    fh=open("Student.txt","r")
    read=fh.read()
    lst=read.rsplit("[")
    # for data in read:
    #     if (roll==data):
    #         data.pop()
    #     else:
    #         print("Record not found")
    print(lst)