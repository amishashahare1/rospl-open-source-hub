
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class ContributionTracker {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<String> contributions = new ArrayList<>();

        System.out.println("=== ROSPL Contribution Tracker ===");

        while (true) {
            System.out.println("\n1. Add contribution");
            System.out.println("2. View contributions");
            System.out.println("3. Exit");
            System.out.print("Choose an option: ");

            String choice = scanner.nextLine().trim();

            switch (choice) {
                case "1":
                    System.out.print("Enter contribution: ");
                    String contribution = scanner.nextLine().trim();

                    if (!contribution.isEmpty()) {
                        contributions.add(contribution);
                        System.out.println("Contribution recorded!");
                    } else {
                        System.out.println("Contribution cannot be empty.");
                    }
                    break;

                case "2":
                    if (contributions.isEmpty()) {
                        System.out.println("No contributions recorded.");
                    } else {
                        System.out.println("Recorded contributions:");
                        for (int i = 0; i < contributions.size(); i++) {
                            System.out.println(
                                (i + 1) + ". " + contributions.get(i)
                            );
                        }
                    }
                    break;

                case "3":
                    System.out.println("Thank you for contributing!");
                    scanner.close();
                    return;

                default:
                    System.out.println("Invalid choice. Try again.");
            }
        }
    }
}
