import Func as f

i=1
while(i==1):
    print("Press 1 to add new student")
    print("Press 2 to delete student")
    print("Press 3 to update details of student")
    print("Press 4 to view details of student")
    print("Press 5 exit")
    ch=int(input("Enter Your Choice: "))
    if(ch==1):
        print("To enter new student add following details")
        f.insert()
        i=1
    elif(ch==2):
        f.delete()
        i=1
    elif(ch==3):
        f.update()
        i=1
    elif(ch==4):
        f.view()
        i=1
    elif(ch==5):
        print("Thank You for using application")
        i=0
    else:
        print("Enter a valid choice")
        i=1