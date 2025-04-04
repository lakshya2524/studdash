import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Edit, Loader2 } from 'lucide-react';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface StudentInfoCardProps {
  student: any;
}

const formSchema = z.object({
  studentId: z.string().min(5, {
    message: "Student ID must be at least 5 characters long",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const StudentInfoCard: React.FC<StudentInfoCardProps> = ({ student }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: student?.studentId || '',
    },
  });

  const updateStudentId = useMutation({
    mutationFn: async (values: FormValues) => {
      const res = await apiRequest('PATCH', `/api/students/${student.id}/update-student-id`, {
        studentId: values.studentId,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/students/${student.id}`] });
      queryClient.invalidateQueries({ queryKey: ['/api/students/1'] });
      setIsEditMode(false);
      toast.success({
        title: "Success",
        description: "Student ID updated successfully!",
      });
    },
    onError: (error: any) => {
      toast.error({
        title: "Error",
        description: error.message || "Failed to update student ID",
      });
    },
  });

  const toggleEditMode = () => {
    if (!isEditMode) {
      form.reset({ studentId: student?.studentId || '' });
    }
    setIsEditMode(!isEditMode);
  };

  const onSubmit = (values: FormValues) => {
    updateStudentId.mutate(values);
  };

  return (
    <Card className="col-span-1 transition-shadow hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium text-gray-800">Student Information</h3>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleEditMode}
            aria-label="Edit information"
          >
            <Edit size={18} className="text-primary" />
          </Button>
        </div>
        
        {isEditMode ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-500">Student ID</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={toggleEditMode}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={updateStudentId.isPending}
                >
                  {updateStudentId.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="text-gray-800 font-medium">{student?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Student ID</p>
              <p className="text-gray-800 font-medium">{student?.studentId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-800 font-medium">{student?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Department</p>
              <p className="text-gray-800 font-medium">{student?.department}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentInfoCard;
